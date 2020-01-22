# Intro

Let's create a simple module with a controller and view. After this module you will know how:

* Create a new twig view
* Pass variables to the new template
* Create a new controller
* Add a new yml configuration

[Download Module](https://github.com/DanielRomanMartinez/Akeneo-Labs/tree/master/Render%20a%20template%20and%20link%20it%20to%20menu)

## Structure

We will start with the same structure that we created in our [first module](https://bitbucket.org/onedirect/akeneo/wiki/How%20to%20create%20our%20first%20module)

And then we are going to create additional files and folder.

## controllers.yml

Lets create this file inside of **<nameBundle>/Resources/config/**

With the next information:


```
services:
  # Controller
  test.controller:
    class: 'Test\Bundle\TestBundle\Controllers\TestController'
    # arguments: # if we need to pass arguments to the controller
    #  - '@pim_internal_api_serializer'
    #  - '@validator'
```

As you can see, we can pass more information to the controller as parameters.

## routing.yml

This file is created also in config folder, **<nameBundle>/Resources/config/**


```
route_with_php_controller:
    path: /route_with_php_controller
    defaults: { _controller: test.controller:testAction } # name the controller declared in controllers.yml
    methods: [GET]
```

## TestController.php

We specified the controller in controllers.yml but we didn't create it. We will create a controllers folder and then our controller.

**Test/Bundle/TestBundle/Controllers/TestController.php**


```
<?php

namespace Test\Bundle\TestBundle\Controllers;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class TestController extends AbstractController
{
    /**
     * @param NormalizerInterface $normalizer
     * @param ValidatorInterface $validator
     */
    /* Example of controller
    public function __construct(
        NormalizerInterface $normalizer,
        ValidatorInterface $validator
    )
    {
        $this->normalizer = $normalizer;
        $this->validator = $validator;
    }
    */

    /**
     * Example Controller rendering twig
     *
     *
     * @param Request $request
     *
     * @return Response
     * @throws \LogicException
     * @throws \InvalidArgumentException
     *
     * @throws PropertyException
     */
    public function testAction(Request $request)
    {
        if (!$request->isXmlHttpRequest()) {
            return new RedirectResponse('/');
        }

        //return $this->render('controller-with-html.html.twig');
        return new Response($this->container->get('twig')->render('@Test/controller-with-html.html.twig', [
            'test' => 'Test',
        ]));
    }
}
```


@Test is the name of our company. In our case is **Test** and then the name of the twig file that we will create later.

## controller-with-html.html.twig

This file will be created inside of **Recources/views**


```
<h1>Example of controller with HTML</h1>
<p>This is an example</p>
<br />
<p>Printing information in Twig: {{ test }}</p>
```

## TestExtension.php

Finally to add our new custom yml, with the controller configuration we need to add this dependency. To add, we need to create a Dependency Injector:

** Test/Bundle/TestBundle/DependencyInjection/TestExtension.php **


```
<?php


namespace Test\Bundle\TestBundle\DependencyInjection;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;

class TestExtension extends Extension
{
    /**
     * {@inheritdoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        // Load additional yml files that are not default like controllers, services, and so on
        $loader = new Loader\YamlFileLoader($container, new FileLocator(__DIR__ . '/../Resources/config'));
        $loader->load('controllers.yml');
    }
}
```

## Result

![Screenshoot](https://i.imgur.com/x0XQDlT.png)