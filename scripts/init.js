window.onload = function () {
  emojify.setConfig({
      emojify_tag_type : 'span',
      only_crawl_id    : null,            // Use to restrict where emojify.js applies
      img_dir          : 'img/emoji',  // Directory for emoji images
      ignored_tags     : {                // Ignore the following tags
          'SCRIPT'  : 1,
          'TEXTAREA': 1,
          'A'       : 1,
          'PRE'     : 1,
          'CODE'    : 1
      }
  });
  emojify.run();
}
