<?php

namespace App\Controller;

use App\Entity\Anime;
use App\Repository\AnimeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

class AnimeController extends AbstractController
{
    #[Route('/api/animes', name: 'get_animes', methods: ['GET'])]
    public function getAnimes(AnimeRepository $animeRepository, SerializerInterface $serializer): JsonResponse
    {
        $animes = $animeRepository->findAll();
        $json = $serializer->serialize($animes, 'json', ['groups' => ['anime:read']]);

        return new JsonResponse($json, 200, [], true);
    }

    #[Route('/api/animes', name: 'add_anime', methods: ['POST'])]
    public function addAnime(Request $request, EntityManagerInterface $em)
    {
        if (!$request->files->has('image')) {
            throw new \Exception('Aucune image fournie.');
        }

        $imageFile = $request->files->get('image');
        $imageName = uniqid() . '.' . $imageFile->guessExtension();
        
        $imageFile->move('uploads/images', $imageName);
        $imagePath = 'uploads/images/' . $imageName;

        $title = $request->request->get('title');
        $description = $request->request->get('description');
        $type = $request->request->get('type');
        $episodes = $request->request->get('episodes');

        if (!$title || !$description || !$type || !$episodes) {
            throw new \Exception('Le titre et la description sont obligatoires.');
        }

        $anime = new Anime();
        $anime->setTitle($title);
        $anime->setDescription($description);
        $anime->setImage($imagePath);
        $anime->setType($type);
        $anime->setEpisodes((int)$episodes);

        $em->persist($anime);
        $em->flush();

        return new JsonResponse(['status' => 'Anime ajouté avec succès']);
    }


    #[Route('/api/animes/{id}', name: 'get_anime', methods: ['GET'])]
    public function getAnime(Anime $anime, SerializerInterface $serializer): JsonResponse
    {
        $json = $serializer->serialize($anime, 'json', ['groups' => ['anime:read']]);

        return new JsonResponse($json, 200, [], true);
    }
}
