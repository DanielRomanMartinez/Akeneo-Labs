# Intro

Let's create a module that will add us a new option in menu and render a custom view. After this module you will know how:

* Create a new template and render it
* Pass variables to the new template
* Create a new menu option

## Structure

We will start with the same structure that we created in our [first module](https://bitbucket.org/onedirect/akeneo/wiki/How%20to%20create%20our%20first%20module)

And then we are going to create additional files and folder.

## Requirejs.yml

Here we are going to declare the JS module, the HTML template and also the js controller for our new route


```
# MyCompany/Bundle/MyCustomBundle/Resources/config/requirejs.yml
config:
    paths:
        # JS
        mycompany/mycustombundle/view/index: mycompanymycustom/js/view/index

        # JS CONTROLLER
        mycompany/mycustombundle/controller/index: mycompanymycustom/js/controller/index

        # HTML
        mycompany/mycustombundle/template/intex: mycompanymycustom/template/index.html # Where is located the HTML file

    config:
        pim/controller-registry:
            controllers: # Registering a new controller for this view
                new_view: # Must be the same name that routing
                    module: mycompany/mycustombundle/controller/index
```

## Routing.yml

We need to add our new route in routing.yml

```
# MyCompany/Bundle/MyCustomBundle/Resources/config/routing.yml
new_view:
    path: /new_view
```

## view/index.js

We pass the template in define section, we pass the html module created in requirejs.

Also you can set listeners, pass variables, and so on. This is an example:

```
# MyCompany/Bundle/MyCustomBundle/Resources/public/js/view/index.js

'use strict';
/**
 * Example how to display a template
 */
define(
    [
        'jquery',
        'underscore',
        'pim/form',
        'mycompany/mycustombundle/index-template'
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

```

## index.html


```
<h1>Example</h1>

<p>This is an example of template</p>
<br>
<p>Rendering a variable: <%- test %></p>
<br>
<p><button class="alert">Show my alert!</button></p>

```
## menu.yml

Lets create the menu, we need to create a new yml inside of config

```
# MyCompany/Bundle/MyCustomBundle/Resources/config/form_extensions/menu.yml

extensions:
    test-menu:
        module: pim/menu/tab
        parent: pim-menu
        targetZone: mainMenu
        position: 110
        config:
            title: 'New View'
            iconModifier: iconCard
            to: new_view # Name of the route declared in routing.yml
```

## index.yml

And finally the yml.file where we are going to set our view configuration. Has two sections, the first one has the view and the second one is to config the menu and mark as selected the new menu option that we created


```
# MyCompany/Bundle/MyCustomBundle/Resources/config/form_extensions/index.yml
extensions:
    test-bundle-controller-with-js:
        module: mycompany/mycustombundle/view/index # Module defined in requirejs.yml

    test-bundle-controller-with-js-breadcrumbs:
        module: pim/common/breadcrumbs
        parent: test-bundle-controller-with-js
        targetZone: breadcrumbs
        config:
            tab: test-menu # Defined in menu.yml
```

## controller/index.js

**my-company-my-bundle-index** is the name that we specified in **index.yml**

```
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
```


## Import the new routes

we need to import all our routed in Akeneo.

Edit the next file and add: **app/config/routing.yml**

#!yaml

mycompany_mycustom:
    resource: "@MyCompanyMyCustomBundle/Resources/config/routing.yml"

## Enable the bundle

After that, we need to register this new bundle that we created in to Akeneo, to do that we need to edit the next file:

**app/AppKernel.php**

And edit the registerProjectBundles function to add our bundle.


```
protected function registerProjectBundles()
{
  return [
       // your app bundles should be registered here
       new MyCompany\Bundle\MyCustomBundle\MyCompanyMyCustomBundle(),
  ];
}
```

## Final Result

![Screenshot](https://i.imgur.com/R3VyDbD.png)
