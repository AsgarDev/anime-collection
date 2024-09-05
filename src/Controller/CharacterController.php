<?php

namespace App\Controller;

use App\Repository\CharacterRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

class CharacterController extends AbstractController
{
    #[Route('/api/animes/{animeId}/characters', name: 'get_characters', methods: ['GET'])]
    public function getCharacters($animeId, CharacterRepository $characterRepository, SerializerInterface $serializer): JsonResponse
    {
        $characters = $characterRepository->findBy(['anime' => $animeId]);
        $json = $serializer->serialize($characters, 'json', ['groups' => ['anime:read']]);
        return new JsonResponse($json, 200, [], true);
    }
}
