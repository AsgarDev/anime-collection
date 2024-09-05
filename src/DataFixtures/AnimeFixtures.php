<?php

namespace App\DataFixtures;

use App\Entity\Anime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AnimeFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $animes = [
            ['title' => 'Naruto', 'description' => 'L\'histoire d\'un jeune ninja.'],
            ['title' => 'One Piece', 'description' => 'Une aventure de pirate pour trouver le trésor ultime.'],
            ['title' => 'L\'attaque des Titans', 'description' => 'L\'humanité se bat contre les géants.'],
            ['title' => 'My Hero Academia', 'description' => 'Un monde où presque tout le monde possède des super pouvoirs.'],
            ['title' => 'Death Note', 'description' => 'Un lycéen découvre un cahier aux pouvoirs mortels.'],
            ['title' => 'Fullmetal Alchemist', 'description' => 'Deux frères utilisent l\'alchimie pour rechercher la pierre philosophale.'],
            ['title' => 'Dragon Ball Z', 'description' => 'Des guerriers dotés de capacités surhumaines se battent pour sauver la Terre.'],
            ['title' => 'Sword Art Online', 'description' => 'Les joueurs sont piégés dans un MMORPG de réalité virtuelle.'],
            ['title' => 'Fairy Tail', 'description' => 'Une guilde de sorciers part à l\'aventure.'],
            ['title' => 'Bleach', 'description' => 'Un lycéen devient un Soul Reaper.'],
            ['title' => 'Demon Slayer', 'description' => 'Un enfant né dans un petit village de montagne s\'entraîne pour devenir un tueur de démons.'],
            ['title' => 'Black Clover', 'description' => 'Asta, né sans pouvoir magique est déterminé à devenir le plus grand magicien de tous les temps.'],
        ];

        foreach ($animes as $key => $data) {
            $anime = new Anime();
            $anime->setTitle($data['title'])
                  ->setDescription($data['description']);

            $this->addReference('anime_' . $key, $anime);
            $manager->persist($anime);
        }

        $manager->flush();
    }
}
