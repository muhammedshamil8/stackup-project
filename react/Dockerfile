# Set the base image
FROM php:8.1-apache

# Enable mod_rewrite
RUN a2enmod rewrite

# Install MySQLi extension
RUN docker-php-ext-install mysqli

# Enable the MySQLi extension
RUN docker-php-ext-enable mysqli


# Copy the PHP application code into the container
COPY api /var/www/html

# Install dependencies and enable extensions
RUN apt-get update && apt-get install -y \
    curl \
    g++ \
    git \
    libbz2-dev \
    libpq-dev \
    libfreetype6-dev \
    libicu-dev \
    libjpeg-dev \
    libonig-dev \
    libzip-dev \
    libmcrypt-dev \
    libpng-dev \
    libreadline-dev \
    sudo \
    unzip \
    zip \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install \
        bcmath \
        bz2 \
        calendar \
        iconv \
        pdo \
        pdo_pgsql \
        intl \
        mbstring \
        opcache \
        pdo_mysql \
        zip \
        exif \
    && docker-php-ext-enable \
        bcmath \
        bz2 \
        calendar \
        iconv \
        pdo \
        pdo_pgsql \
        intl \
        mbstring \
        opcache \
        pdo_mysql \
        zip \
        exif \
    && docker-php-ext-configure gd --enable-gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd

# Install and enable Xdebug
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug


# Install MySQL client
RUN apt-get update && apt-get install -y default-mysql-client
# Optionally, copy a custom PHP configuration file
# COPY conf/php.ini /usr/local/etc/php/php.ini
