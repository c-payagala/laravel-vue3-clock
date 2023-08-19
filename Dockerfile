FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip

RUN docker-php-ext-install pdo pdo_mysql sockets

RUN curl -sS https://getcomposer.org/installer | php -- \
     --install-dir=/usr/local/bin --filename=composer

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN apt-get install nodejs npm -y


WORKDIR /app
COPY ./app /app

RUN composer install

RUN composer require laravel/breeze --dev

EXPOSE 8000
EXPOSE 5173
CMD php artisan serve --host=0.0.0.0 --port=8000
