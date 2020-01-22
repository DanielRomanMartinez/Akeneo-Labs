'use strict';
/**
 * Example how to display a template
 */
define(
    [
        'jquery',
        'underscore',
        'pim/form',
        'mycompany/mycustombundle/template/intex'
    ],
    function ($, _, BaseForm, template) {
        return BaseForm.extend({
            template: _.template(template),
            events: {
                'click .alert': 'showAlert'
            },

            /**
             * Makes an alert
             */
            showAlert: function () {
                alert('Showing alert!');
            },

            /**
             * {@inheritdoc}
             */
            initialize: function (config) {
                this.config = config.config;

                BaseForm.prototype.initialize.apply(this, arguments);
            },

            /**
             * {@inheritdoc}
             */
            render: function () {
                var model = this.getFormData();
                this.$el.html(this.template({
                    test: 'This is an example'
                }));

                return this;
            },
        });
    }
);
