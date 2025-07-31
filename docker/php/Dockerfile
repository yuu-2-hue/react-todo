FROM php:8.3-fpm

# OSパッケージとPHP拡張のインストール
RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev libonig-dev libpq-dev libxml2-dev curl \
    && docker-php-ext-install pdo_mysql zip

# Composerインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN useradd -m homumaru