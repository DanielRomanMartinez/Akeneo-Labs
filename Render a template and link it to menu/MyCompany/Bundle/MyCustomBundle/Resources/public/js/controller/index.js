'use strict';

define(['underscore', 'pim/controller/front', 'pim/form-builder'],
    function (_, BaseController, FormBuilder) {
        return BaseController.extend({
            initialize: function (options) {
                this.options = options;
            },

            renderForm: function (route) {
                return FormBuilder.build('my-company-my-bundle-index').then((form) => {
                    form.setElement(this.$el).render();
                    return form;
                });
            }
        });
    }
);