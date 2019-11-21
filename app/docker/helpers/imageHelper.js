import _ from 'lodash-es';

angular.module('portainer.docker')
.factory('ImageHelper', [function ImageHelperFactory() {
  'use strict';

  var helper = {};

  helper.isValidTag = isValidTag;
  helper.createImageConfigForContainer = createImageConfigForContainer;
  helper.getImagesNamesForDownload = getImagesNamesForDownload;
  helper.removeDigestFromRepository = removeDigestFromRepository;

  function isValidTag(tag) {
    return tag.match(/^(?![\.\-])([a-zA-Z0-9\_\.\-])+$/g);
  }

  function getImagesNamesForDownload(images) {
    var names = images.map(function(image) {
      return image.RepoTags[0] !== '<none>:<none>' ? image.RepoTags[0] : image.Id;
    });
    return {
      names: names
    };
  }

  /**
   * 
   * @param {PorImageRegistryModel} registry
   */
  function createImageConfigForContainer(registry) {
    const data = {
      fromImage: ''
    };
    let fullImageName = '';

    if (registry.UseRegistry && registry.Registry.URL) {
      fullImageName = registry.Registry.URL + '/' + registry.Image;
      if (!_.includes(registry.Image, ':')) {
        fullImageName += ':latest';
      }
    } else {
      fullImageName = registry.Image;
    }

    data.fromImage = fullImageName;
    return data;
  }

  function removeDigestFromRepository(repository) {
    return repository.split('@sha')[0];
  }

  return helper;
}]);
