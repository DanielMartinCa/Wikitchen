(function ($) {

  'use strict';

  Drupal.FieldGroup = Drupal.FieldGroup || {};
  Drupal.FieldGroup.Effects = Drupal.FieldGroup.Effects || {};

  /**
   * This script adds the required and error classes to the details wrapper.
   */
  Drupal.behaviors.fieldGroupDetails = {
    attach: function (context) {
      $(context).find('.field-group-details').once('field-group-details').each(function () {
        var $this = $(this);

        if ($this.is('.required-fields') && ($this.find('[required]').length > 0 || $this.find('.form-required').length > 0)) {
          $('summary', $this).first().addClass('form-required');
        }
      });
    }
  };

})(jQuery);
;
/**
 * @file
 * Color Field jQuery.
 */

(function ($) {

jQuery.fn.addColorPicker = function (props) {

  'use strict';

  if (!props) {
    props = [];
  }

  props = jQuery.extend({
    currentColor:'',
    blotchElemType: 'button',
    blotchClass:'colorBox',
    blotchTransparentClass:'transparentBox',
    addTransparentBlotch: true,
    clickCallback: function (ignoredColor) {},
    iterationCallback: null,
    fillString: '&nbsp;',
    fillStringX: '?',
    colors: [
      '#AC725E','#D06B64','#F83A22', '#FA573C', '#FF7537', '#FFAD46',
      '#42D692','#16A765', '#7BD148','#B3DC6C','#FBE983',
      '#92E1C0', '#9FE1E7', '#9FC6E7', '#4986E7','#9A9CFF',
      '#B99AFF','#C2C2C2','#CABDBF','#CCA6AC','#F691B2',
      '#CD74E6','#A47AE2',
    ]
  }, props);

  this.addBlotchElement = function (color, blotchClass) {
    var elem = jQuery('<' + props.blotchElemType + '/>')
      .addClass(blotchClass)
      .attr('value',color)
      .attr('color',color)
      .attr('title', color)
      .css('background-color',color);
    // Jq bug: chaining here fails if color is null b/c .css() returns (new String('transparent'))!
    if (props.currentColor.toLowerCase() == color.toLowerCase()) {
      elem.addClass('active');
    }
    if (props.clickCallback) {
      elem.click(function (event) {
        event.preventDefault();
        jQuery(this).parent().children().removeClass('active');
        jQuery(this).addClass('active');
        props.clickCallback(jQuery(this).attr('color'));
      });
    }
    this.append(elem);
    if (props.iterationCallback) {
      props.iterationCallback(this, elem, color, i);
    }
  }

  for (var i = 0; i < props.colors.length; ++i) {
    var color = props.colors[i];
    this.addBlotchElement(color, props.blotchClass);
  }

  if (props.addTransparentBlotch) {
    this.addBlotchElement('', props.blotchTransparentClass);
  }

  return this;
};

})(jQuery);
;
/**
 * @file
 * Attaches behaviors for Drupal's color field.
 */

(function ($, Drupal) {

    'use strict';

    /**
     * Enables box widget on color elements.
     *
     * @type {Drupal~behavior}
     *
     * @prop {Drupal~behaviorAttach} attach
     *   Attaches a box widget to a color input element.
     */
    Drupal.behaviors.color_field = {
        attach: function (context, settings) {

            var $context = $(context);

            $context.find('.color-field-widget-box-form').once('colorField').each(function (index, element) {
                var $element = $(element);
                var $input = $element.prev().find('input');
                $input.hide();
                var props = settings.color_field.color_field_widget_box.settings[$element.prop('id')];

                $element.empty().addColorPicker({
                    currentColor: $input.val(),
                    colors: props.palette,
                    blotchClass:'color_field_widget_box__square',
                    blotchTransparentClass:'color_field_widget_box__square--transparent',
                    addTransparentBlotch: !props.required,
                    clickCallback: function (color) {
                        $input.val(color).trigger('change');
                    }
                });
            });

        },
    };

})(jQuery, Drupal);
;
