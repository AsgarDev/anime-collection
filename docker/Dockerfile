FROM php:8.3-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
build-essential \
libssl-dev \
acl \
locales \
libpq-dev \
zip \
vim \
git \
curl \
nodejs \
npm

RUN apt-get install -y libicu-dev && docker-php-ext-configure intl

RUN npm install -g yarn

# Install extensions
RUN docker-php-ext-install pdo pdo_pgsql opcache exif pcntl intl

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install Symfony CLI
RUN curl -sS https://get.symfony.com/cli/installer | bash
RUN mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

# Add user
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

# Copy existing application directory contents
COPY . /var/www

# Copy existing application directory permissions
COPY --chown=www:www . /var/www

# Change current user to www
USER www

# Set working directory
WORKDIR /var/www
