
document.addEventListener('DOMContentLoaded', () => {
	//1. 
	//코너스톤 초기화
	cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
	cornerstoneWADOImageLoader.external.cornerstoneTools = cornerstoneTools;

	// 이미지를 넣을 요소 얻어오기
	const element = document.getElementById('dicomImage');

	// 이미지 요소를 초기화
	cornerstone.enable(element);

	// 이미지 얻어오기(기본 루트는 static)
	const imageId = 'wadouri:img/CT.1.2.840.113619.2.80.3826517136.10405.1536138231.15.dcm';

	cornerstone.loadImage(imageId).then(image => {
		cornerstone.displayImage(element, image);
	}).catch(err => {
		console.log('이미지 로드 실패 : ', err);
	})


	//2. Add event handler to the ww/wc apply button
	/*document.getElementById('apply').addEventListener('click', function(e) {
		let viewport = cornerstone.getViewport(element);
		viewport.voi.windowWidth = parseFloat(document.getElementById('ww').value);
		viewport.voi.windowCenter = parseFloat(document.getElementById('wc').value);
		cornerstone.setViewport(element, viewport);
	});

	document.getElementById('invert').addEventListener('click', function(e) {
		let viewport = cornerstone.getViewport(element);
		viewport.invert = !viewport.invert;
		cornerstone.setViewport(element, viewport);
	});

	// add event handlers to mouse move to adjust window/center
	element.addEventListener('mousedown', function(e) {
		let lastX = e.pageX;
		let lastY = e.pageY;

		function mouseMoveHandler(e) {
			const deltaX = e.pageX - lastX;
			const deltaY = e.pageY - lastY;
			lastX = e.pageX;
			lastY = e.pageY;

			let viewport = cornerstone.getViewport(element);
			viewport.voi.windowWidth += (deltaX / viewport.scale);
			viewport.voi.windowCenter += (deltaY / viewport.scale);
			cornerstone.setViewport(element, viewport);
		};

		function mouseUpHandler() {
			document.removeEventListener('mousemove', mouseMoveHandler);
			document.removeEventListener('mouseup', mouseUpHandler);
		}

		document.addEventListener('mousemove', mouseMoveHandler);
		document.addEventListener('mouseup', mouseUpHandler);
	});*/
	
	//3. Add event handlers to zoom the image in and out
   /* document.getElementById('zoomIn').addEventListener('click', function (e) {
        const viewport = cornerstone.getViewport(element);
        viewport.scale += 0.25;
        cornerstone.setViewport(element, viewport);
    });
    document.getElementById('zoomOut').addEventListener('click', function (e) {
        const viewport = cornerstone.getViewport(element);
        viewport.scale -= 0.25;
        cornerstone.setViewport(element, viewport);
    });
    document.getElementById('reset').addEventListener('click', function (e) {
        cornerstone.reset(element);
    });

    // add event handlers to pan image on mouse move
    element.addEventListener('mousedown', function (e) {
      let lastX = e.pageX;
      let lastY = e.pageY;

      function mouseMoveHandler(e) {
        const deltaX = e.pageX - lastX;
        const deltaY = e.pageY - lastY;
        lastX = e.pageX;
        lastY = e.pageY;

        const viewport = cornerstone.getViewport(element);
        viewport.translation.x += (deltaX / viewport.scale);
        viewport.translation.y += (deltaY / viewport.scale);
        cornerstone.setViewport(element, viewport);
      }

      function mouseUpHandler() {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      }

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    });

    const mouseWheelEvents = ['mousewheel', 'DOMMouseScroll'];
    mouseWheelEvents.forEach(function(eventType) {
      element.addEventListener(eventType, function (e) {
        // Firefox e.detail > 0 scroll back, < 0 scroll forward
        // chrome/safari e.wheelDelta < 0 scroll back, > 0 scroll forward
        let viewport = cornerstone.getViewport(element);
        if (e.wheelDelta < 0 || e.detail > 0) {
          viewport.scale -= 0.25;
        } else {
          viewport.scale += 0.25;
        }

        cornerstone.setViewport(element, viewport);

        // Prevent page from scrolling
        return false;
      });
    });*/
    
    // 4. Add event handlers to flip or rotate the image
   /* document.getElementById('hFlip').addEventListener('click', function (e) {
        const viewport = cornerstone.getViewport(element);
        viewport.hflip = !viewport.hflip;
        cornerstone.setViewport(element, viewport);
    });

    document.getElementById('vFlip').addEventListener('click', function (e) {
        const viewport = cornerstone.getViewport(element);
        viewport.vflip = !viewport.vflip;
        cornerstone.setViewport(element, viewport);
    });

    document.getElementById('lRotate').addEventListener('click', function (e) {
        const viewport = cornerstone.getViewport(element);
        viewport.rotation-=90;
        cornerstone.setViewport(element, viewport);
    });

    document.getElementById('rRotate').addEventListener('click', function (e) {
        const viewport = cornerstone.getViewport(element);
        viewport.rotation+=90;
        cornerstone.setViewport(element, viewport);
    });

    document.getElementById('reset').addEventListener('click', function (e) {
        cornerstone.reset(element);
    });

    element.addEventListener('mousemove', function(event) {
        const pixelCoords = cornerstone.pageToPixel(element, event.pageX, event.pageY);
        document.getElementById('coords').textContent = "pageX=" + event.pageX + ", pageY=" + event.pageY + ", pixelX=" + pixelCoords.x + ", pixelY=" + pixelCoords.y;
    });*/
     // You can add any option you want to `options` object.
    const layers = [{
            imageId: 'ct://1',
            options: {
                name: 'CT'
            }
        }, {
            imageId: 'pet://1',
            options: {
                name: 'PET',
                opacity: 0.7,
                viewport: {
                    colormap: 'hotIron',
                    voi: {
                        windowWidth: 30,
                        windowCenter: 16
                    }
                }
            }
        }
    ];

    // This is the main function responsible for loading all layers
    // This method will wait for all images to be loaded (`loadImages`)
    // before adding the layers
    function loadLayers() {
        loadImages().then(function(images) {
            images.forEach(function(image, index) {
                const layer = layers[index];
                const layerId = cornerstone.addLayer(element, image, layer.options);

                cornerstone.updateImage(element);
                console.log('Layer ' + index + ': ' + layerId);
            });

            // Update dropdown size to make all layers name visible
            const layersDropdown = document.getElementById('layers');
            layersDropdown.size = layers.length;

            // Listen to `change` event to set the selected layer as active
            layersDropdown.addEventListener('change', function(event) {
                const layerId = event.currentTarget.value;
                cornerstone.setActiveLayer(element, layerId);
            });
        });
    }

    // This method loads the image of each layer and resolve the
    // promise only after getting all of them loaded
    function loadImages() {
        const promises = [];

        layers.forEach(function(layer) {
            const loadPromise = cornerstone.loadAndCacheImage(layer.imageId);
            promises.push(loadPromise);
        });

        return Promise.all(promises);
    }

    // Select the right layer in the dropdown
    function updateSelectedLayer(layerId) {
        const layers = document.getElementById('layers');
        const currentLayerId = layers.value;

        if(currentLayerId !== layerId) {
            layers.value = layerId;

            // Trigger a change event
            const event = new Event('change');
            element.dispatchEvent(event);
        }
    }

    // Listen to `change` event to activate/deactivate the viewport synchronization
    document.querySelector('input[name=syncViewports]').addEventListener('change', function(event) {
        const enabledElement = cornerstone.getEnabledElement(element);
        enabledElement.syncViewports = event.currentTarget.checked;
        cornerstone.updateImage(element);
    });

    document.getElementById('colormaps').addEventListener('change', function() {
        const layer = cornerstone.getActiveLayer(element);
        layer.viewport.colormap = document.getElementById('colormaps').value;
        cornerstone.updateImage(element);
    });

    // Listen to `change` event to update the opacity of the active layer
    document.getElementById("imageOpacity").addEventListener('change', function(event) {
        const layer = cornerstone.getActiveLayer(element);
        layer.options.opacity = parseFloat(event.currentTarget.value);
        cornerstone.updateImage(element);
    });

    // Listen to `change` event to update the visibility of the active layer
    document.querySelector('input[name=visible]').addEventListener('change', function(event) {
        const layer = cornerstone.getActiveLayer(element);
        layer.options.visible = event.currentTarget.checked;
        cornerstone.updateImage(element);
    });

    // This event will be called every time a layer is added through cornerstone.addLayer
    // The layer is added to the dropdown to make it possible to select and interact with it
    element.addEventListener('cornerstonelayeradded', function(e) {
        const eventData = e.detail;
        const layer = cornerstone.getLayer(eventData.element, eventData.layerId);
        const layers = document.getElementById('layers');

        const layerOption = document.createElement("OPTION");
        layerOption.value = layer.layerId;
        layerOption.textContent = layer.options.name;

        // Set the layer as selected in case its the the first layer to be added
        if(layers.childElementCount === 0) {
            layerOption.checked = true;
        }

        layers.appendChild(layerOption);
    });

    // This event will be called every time cornerstone.setActiveLayer is called
    // We need to load the layer properties and update the selected layer in the dropdown
    element.addEventListener('cornerstoneactivelayerchanged', function(e) {
        const eventData = e.detail;
        const layer = cornerstone.getActiveLayer(element);
        const colormap = layer.viewport.colormap || '';
        const opacity = layer.options.opacity == null ? 1 : layer.options.opacity;

        // Restore all properties for the active layer
        document.getElementById('imageOpacity').value = opacity;
        document.querySelector("input[name=visible]").checked = layer.options.visible === undefined ? true : layer.options.visible;
        document.getElementById('colormaps').value = colormap;

        updateSelectedLayer(eventData.layerId);
    });


    // Populate colormap dropdown with all the default ones
    function fillColormapsList() {
        const dropdown = document.getElementById('colormaps');
        const colormapsList = cornerstone.colors.getColormapsList();

        const addOption = function(id, name) {
            const option = document.createElement("OPTION");
            option.value = id;
            option.textContent = name;

            dropdown.append(option);
        };

        colormapsList.forEach(function(colormapItem) {
            addOption(colormapItem.id, colormapItem.name);
        });
    }

      // add event handlers to pan image on mouse move
      element.addEventListener('mousedown', function (e) {
        let lastX = e.pageX;
        let lastY = e.pageY;
        const mouseButton = e.which;

        function mouseMoveHandler(e) {
          const deltaX = e.pageX - lastX;
          const deltaY = e.pageY - lastY;
          lastX = e.pageX;
          lastY = e.pageY;

          if (mouseButton === 1) {
            let viewport = cornerstone.getViewport(element);
            viewport.voi.windowWidth += (deltaX / viewport.scale);
            viewport.voi.windowCenter += (deltaY / viewport.scale);
            cornerstone.setViewport(element, viewport);
          } else if (mouseButton === 2) {
            let viewport = cornerstone.getViewport(element);
            viewport.translation.x += (deltaX / viewport.scale);
            viewport.translation.y += (deltaY / viewport.scale);
            cornerstone.setViewport(element, viewport);
          } else if (mouseButton === 3) {
            let viewport = cornerstone.getViewport(element);
            viewport.scale += (deltaY / 100);
            cornerstone.setViewport(element, viewport);

            document.getElementById('layerViewportScale').innerText = viewport.scale;
          }

          const layer1 = cornerstone.getLayers(element)[0];
          const layer2 = cornerstone.getLayers(element)[1];

          document.getElementById('layer1LayerViewportScale').innerText = layer1.viewport.scale;
          document.getElementById('layer2LayerViewportScale').innerText = layer2.viewport.scale;
          document.getElementById('layer1LayerSyncScale').innerText = layer1.syncProps.originalScale;
          document.getElementById('layer2LayerSyncScale').innerText = layer2.syncProps.originalScale;
          
        }

        function mouseUpHandler() {
          document.removeEventListener('mouseup', mouseUpHandler);
          document.removeEventListener('mousemove', mouseMoveHandler);
        }

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
      });

      const mouseWheelEvents = ['mousewheel', 'DOMMouseScroll'];
      mouseWheelEvents.forEach(function(eventType) {
        element.addEventListener(eventType, function (e) {
          // Firefox e.detail > 0 scroll back, < 0 scroll forward
          // chrome/safari e.wheelDelta < 0 scroll back, > 0 scroll forward
          let viewport = cornerstone.getViewport(element);
          if (e.wheelDelta < 0 || e.detail > 0) {
            viewport.scale -= 0.25;
          } else {
            viewport.scale += 0.25;
          }

          cornerstone.setViewport(element, viewport);

          // Prevent page from scrolling
          return false;
        });
      });

    // Start point to load all layers and colormaps and
    // also attach a click listener to each tool
    loadLayers();
    fillColormapsList();
})

