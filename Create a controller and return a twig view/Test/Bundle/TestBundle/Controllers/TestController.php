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