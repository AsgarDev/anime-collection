<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240731115620 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE anime ADD type VARCHAR(50) DEFAULT NULL');
        $this->addSql('ALTER TABLE anime ADD episodes INT DEFAULT 0');

        $this->addSql("UPDATE anime SET type = 'Unknown' WHERE type IS NULL");
        
        $this->addSql('ALTER TABLE anime ALTER COLUMN type SET NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE anime DROP COLUMN type');
        $this->addSql('ALTER TABLE anime DROP COLUMN episodes');
    }
}
