<?php

namespace App\DataFixtures;

use App\Entity\Character;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class CharacterFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $characters = [
            // Naruto
            ['name' => 'Naruto Uzumaki', 'role' => 'Protagoniste', 'anime' => 'anime_0'],
            ['name' => 'Sasuke Uchiha', 'role' => 'Antagoniste', 'anime' => 'anime_0'],
            ['name' => 'Sakura Haruno', 'role' => 'Soutien', 'anime' => 'anime_0'],
            // One Piece
            ['name' => 'Monkey D. Luffy', 'role' => 'Protagoniste', 'anime' => 'anime_1'],
            ['name' => 'Roronoa Zoro', 'role' => 'Soutien', 'anime' => 'anime_1'],
            ['name' => 'Nami', 'role' => 'Soutien', 'anime' => 'anime_1'],
            // L'attaque des Titans
            ['name' => 'Eren Yeager', 'role' => 'Protagoniste', 'anime' => 'anime_2'],
            ['name' => 'Mikasa Ackerman', 'role' => 'Soutien', 'anime' => 'anime_2'],
            ['name' => 'Armin Arlert', 'role' => 'Soutien', 'anime' => 'anime_2'],
            // My Hero Academia
            ['name' => 'Izuku Midoriya', 'role' => 'Protagoniste', 'anime' => 'anime_3'],
            ['name' => 'Katsuki Bakugo', 'role' => 'Antagoniste', 'anime' => 'anime_3'],
            ['name' => 'Ochaco Uraraka', 'role' => 'Soutien', 'anime' => 'anime_3'],
            // Death Note
            ['name' => 'Light Yagami', 'role' => 'Protagoniste', 'anime' => 'anime_4'],
            ['name' => 'L', 'role' => 'Antagoniste', 'anime' => 'anime_4'],
            ['name' => 'Misa Amane', 'role' => 'Soutien', 'anime' => 'anime_4'],
            // Fullmetal Alchemist
            ['name' => 'Edward Elric', 'role' => 'Protagoniste', 'anime' => 'anime_5'],
            ['name' => 'Alphonse Elric', 'role' => 'Soutien', 'anime' => 'anime_5'],
            ['name' => 'Roy Mustang', 'role' => 'Soutien', 'anime' => 'anime_5'],
            // Dragon Ball Z
            ['name' => 'Goku', 'role' => 'Protagoniste', 'anime' => 'anime_6'],
            ['name' => 'Vegeta', 'role' => 'Antagoniste', 'anime' => 'anime_6'],
            ['name' => 'Bulma', 'role' => 'Soutien', 'anime' => 'anime_6'],
            // Sword Art Online
            ['name' => 'Kirito', 'role' => 'Protagoniste', 'anime' => 'anime_7'],
            ['name' => 'Asuna', 'role' => 'Soutien', 'anime' => 'anime_7'],
            ['name' => 'Klein', 'role' => 'Soutien', 'anime' => 'anime_7'],
            // Fairy Tail
            ['name' => 'Natsu Dragneel', 'role' => 'Protagoniste', 'anime' => 'anime_8'],
            ['name' => 'Lucy Heartfilia', 'role' => 'Soutien', 'anime' => 'anime_8'],
            ['name' => 'Gray Fullbuster', 'role' => 'Soutien', 'anime' => 'anime_8'],
            // Bleach
            ['name' => 'Ichigo Kurosaki', 'role' => 'Protagoniste', 'anime' => 'anime_9'],
            ['name' => 'Rukia Kuchiki', 'role' => 'Soutien', 'anime' => 'anime_9'],
            ['name' => 'Orihime Inoue', 'role' => 'Soutien', 'anime' => 'anime_9'],
        ];

        foreach ($characters as $data) {
            $character = new Character();
            $character->setName($data['name'])
                      ->setRole($data['role'])
                      ->setAnime($this->getReference($data['anime']));

            $manager->persist($character);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            AnimeFixtures::class,
        ];
    }
}
