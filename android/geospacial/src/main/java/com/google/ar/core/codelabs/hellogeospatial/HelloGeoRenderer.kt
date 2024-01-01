/*
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.google.ar.core.codelabs.hellogeospatial

import android.opengl.Matrix
import android.util.Log
import androidx.lifecycle.DefaultLifecycleObserver
import androidx.lifecycle.LifecycleOwner
import com.google.android.gms.maps.model.LatLng
import com.google.ar.core.Anchor
import com.google.ar.core.TrackingState
import com.google.ar.core.examples.java.common.helpers.DisplayRotationHelper
import com.google.ar.core.examples.java.common.helpers.TrackingStateHelper
import com.google.ar.core.examples.java.common.samplerender.Framebuffer
import com.google.ar.core.examples.java.common.samplerender.Mesh
import com.google.ar.core.examples.java.common.samplerender.SampleRender
import com.google.ar.core.examples.java.common.samplerender.Shader
import com.google.ar.core.examples.java.common.samplerender.Texture
import com.google.ar.core.examples.java.common.samplerender.arcore.BackgroundRenderer
import com.google.ar.core.exceptions.CameraNotAvailableException
import com.google.ar.core.codelabs.hellogeospatial.AnchorData
import java.io.IOException
import com.google.android.gms.maps.model.Marker
import kotlin.collections.mutableListOf
import com.google.ar.core.codelabs.hellogeospatial.helpers.MapView

data class AnchorData(
    val anchor: Anchor?,
    val meshName: String?,
    val textureName: String?
)

class HelloGeoRenderer(val activity: HelloGeoActivity, val anchorsArray: MutableList<AnchorJsonData>) : SampleRender.Renderer, DefaultLifecycleObserver {
  companion object {
    val TAG = "HelloGeoRenderer"

    private val Z_NEAR = 0.1f
    private val Z_FAR = 1000f
  }

  lateinit var backgroundRenderer: BackgroundRenderer
  lateinit var virtualSceneFramebuffer: Framebuffer
  var hasSetTextureNames = false

  // Virtual object (ARCore pawn)
  var virtualObjectMeshs: MutableList<Mesh> = mutableListOf<Mesh>()
  var virtualObjectShaders: MutableList<Shader> = mutableListOf<Shader>()
  var virtualObjectTextures: MutableList<Texture> = mutableListOf<Texture>()


  // Temporary matrix allocated here to reduce number of allocations for each frame.
  val modelMatrix = FloatArray(16)
  val viewMatrix = FloatArray(16)
  val projectionMatrix = FloatArray(16)
  val modelViewMatrix = FloatArray(16) // view x model
  val modelViewProjectionMatrix = FloatArray(16) // projection x view x model

  val session
    get() = activity.arCoreSessionHelper.session

  val displayRotationHelper = DisplayRotationHelper(activity)
  val trackingStateHelper = TrackingStateHelper(activity)
  var anchors: MutableList<AnchorData> = mutableListOf<AnchorData>()

  init {
    onMapClick()
  }

  override fun onResume(owner: LifecycleOwner) {
    displayRotationHelper.onResume()
    hasSetTextureNames = false
  }

  override fun onPause(owner: LifecycleOwner) {
    displayRotationHelper.onPause()
  }

  override fun onSurfaceCreated(render: SampleRender) {
    // Prepare the rendering objects.
    // This involves reading shaders and 3D model files, so may throw an IOException.
    Log.i("NTMA", "creating surface")
    try {
      backgroundRenderer = BackgroundRenderer(render)
      virtualSceneFramebuffer = Framebuffer(render, /*width=*/ 1, /*height=*/ 1)

       //Virtual object to render (Geospatial Marker)

      for (anchor in anchorsArray) {
        val texture = Texture.createFromAsset(render, anchor.textureName, Texture.WrapMode.CLAMP_TO_EDGE, Texture.ColorFormat.SRGB)
        virtualObjectMeshs.add(Mesh.createFromAsset(render, anchor.meshName))
        virtualObjectTextures.add(texture)
        virtualObjectShaders.add(Shader.createFromAssets(render, "shaders/ar_unlit_object.vert", "shaders/ar_unlit_object.frag",/*defines=*/ null).setTexture("u_Texture", texture))
      }

      backgroundRenderer.setUseDepthVisualization(render, false)
      backgroundRenderer.setUseOcclusion(render, false)
    } catch (e: Throwable) {
      Log.e("NTMA2", e.toString())
    }
  }

  override fun onSurfaceChanged(render: SampleRender, width: Int, height: Int) {
    displayRotationHelper.onSurfaceChanged(width, height)
    virtualSceneFramebuffer.resize(width, height)
  }

  override fun onDrawFrame(render: SampleRender) {
    val session = session ?: return
    // Texture names should only be set once on a GL thread unless they change. This is done during
    // onDrawFrame rather than onSurfaceCreated since the session is not guaranteed to have been
    // initialized during the execution of onSurfaceCreated.
    if (!hasSetTextureNames) {
      session.setCameraTextureNames(intArrayOf(backgroundRenderer.cameraColorTexture.textureId))
      hasSetTextureNames = true
    }

    // -- Update per-frame state

    // Notify ARCore session that the view size changed so that the perspective matrix and
    // the video background can be properly adjusted.
    displayRotationHelper.updateSessionIfNeeded(session)

    // Obtain the current frame from ARSession. When the configuration is set to
    // UpdateMode.BLOCKING (it is by default), this will throttle the rendering to the
    // camera framerate.
    val frame =
      try {
        session.update()
      } catch (e: CameraNotAvailableException) {
        Log.e(TAG, "Camera not available during onDrawFrame", e)
        showError("Camera not available. Try restarting the app.")
        return
      }

    val camera = frame.camera

    // BackgroundRenderer.updateDisplayGeometry must be called every frame to update the coordinates
    // used to draw the background camera image.
    backgroundRenderer.updateDisplayGeometry(frame)

    // Keep the screen unlocked while tracking, but allow it to lock when tracking stops.
    trackingStateHelper.updateKeepScreenOnFlag(camera.trackingState)

    // -- Draw background
    if (frame.timestamp != 0L) {
      // Suppress rendering if the camera did not produce the first frame yet. This is to avoid
      // drawing possible leftover data from previous sessions if the texture is reused.
      backgroundRenderer.drawBackground(render)
    }

    // If not tracking, don't draw 3D objects.
    if (camera.trackingState == TrackingState.PAUSED) {
      return
    }

    // Get projection matrix.
    camera.getProjectionMatrix(projectionMatrix, 0, Z_NEAR, Z_FAR)

    // Get camera matrix and draw.
    camera.getViewMatrix(viewMatrix, 0)

    render.clear(virtualSceneFramebuffer, 0f, 0f, 0f, 0f)

    val earth = session.earth
    if (earth?.trackingState == TrackingState.TRACKING) {
      val cameraGeospatialPose = earth.cameraGeospatialPose
      activity.view.mapView?.updateMapPosition(
        latitude = cameraGeospatialPose.latitude,
        longitude = cameraGeospatialPose.longitude,
        heading = cameraGeospatialPose.heading
      )
    }

    // Draw the placed anchor, if it exists.
    render.renderCompassAtAnchor()

    // Compose the virtual scene with the background.
    backgroundRenderer.drawVirtualScene(render, virtualSceneFramebuffer, Z_NEAR, Z_FAR)
  }

  fun onMapClick() {
    for (anchor in anchors)
        anchor.anchor?.detach()
    anchors.clear()
    InitAnchorAnchors(anchorsArray)
  }

  private fun InitAnchorAnchors(data: MutableList<AnchorJsonData>) {
    val earth = session?.earth ?: return
    val convertedArray: MutableList<AnchorData> = mutableListOf<AnchorData>()

    try {
        data.forEachIndexed({ index, item ->
            val newAnchor = earth.createAnchor(item.lng, item.lat, item.alti, 0f, 0f, 0f, 1f)
            Log.i("NTMA", "Anchor created " + newAnchor.toString() + " " + item.toString())
            convertedArray.add(AnchorData(
                newAnchor,
                item.meshName,
                item.textureName
            ));
            val marker = activity.view.mapView?.createMarker(activity.view.mapView?.EARTH_MARKER_COLOR as Int)
            activity.view.mapView?.earthMarkers?.add(marker);
            activity.view.mapView?.earthMarkers?.get(index)?.apply {
                position = LatLng(item.lat, item.lng)
                    isVisible = true
            };
        })
    } catch (e: Throwable) {
        Log.e("NTMA", e.toString(), e)
    }
    anchors = convertedArray;
  }

  private fun SampleRender.renderCompassAtAnchor() {
    // Get the current pose of the Anchor in world space. The Anchor pose is updated
    // during calls to session.update() as ARCore refines its estimate of the world.

    try {
        anchors.forEachIndexed { index, anchor ->
            anchor.anchor?.pose?.toMatrix(modelViewMatrix, 0)
            Matrix.multiplyMM(modelViewMatrix, 0, viewMatrix, 0, modelMatrix, 0)
            Matrix.multiplyMM(modelViewProjectionMatrix, 0, projectionMatrix, 0, modelViewMatrix, 0)
            virtualObjectShaders.get(index).setMat4("u_ModelViewProjection", modelViewProjectionMatrix)
            Log.e("NTMA", "Draw index " + index.toString() + " mesh " + virtualObjectMeshs.get(index).toString() +
                " shaders " + virtualObjectShaders.get(index).toString() + " " + modelViewMatrix.contentToString())

            draw(virtualObjectMeshs.get(index), virtualObjectShaders.get(index), virtualSceneFramebuffer)
        }
    } catch (e: Throwable) {
        Log.e("NTMA", e.toString(), e)
    }
  }

  private fun showError(errorMessage: String) =
    activity.view.snackbarHelper.showError(activity, errorMessage)
}
