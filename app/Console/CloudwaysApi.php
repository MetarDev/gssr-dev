<?php

namespace App\Console;

use App\Exceptions\CloudwaysApiFailedRequestException;

class CloudwaysApi
{
    /**
     * Fetches the access token from Cloudways.
     *
     * @return string
     */
    public function fetchAccessToken(): string
    {

        // Fetch Access Token
        $tokenResponse = $this->call(
            'POST',
            '/oauth/access_token',
            null,
            [
                'email' => env('CLOUDWAYS_EMAIL'),
                'api_key' => env('CLOUDWAYS_API_KEY'),
            ]
        );

        return $tokenResponse->access_token;
    }

    /**
     * Calls the Cloudways API.
     *
     * @param string $method
     * @param string $url
     * @param string|null $accessToken
     * @param array $post
     * @return object
     */
    public function call($method, $url, $accessToken, $post = [])
    {
        $baseURL = 'https://api.cloudways.com/api/v1';

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_URL, $baseURL . $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        //curl_setopt($ch, CURLOPT_HEADER, 1);
        //Set Authorization Header
        if ($accessToken) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Bearer ' . $accessToken]);
        }

        //Set Post Parameters
        $encoded = '';
        if (count($post)) {
            foreach ($post as $name => $value) {
                $encoded .= urlencode($name) . '=' . urlencode($value) . '&';
            }
            $encoded = substr($encoded, 0, strlen($encoded) - 1);

            curl_setopt($ch, CURLOPT_POSTFIELDS, $encoded);
            curl_setopt($ch, CURLOPT_POST, 1);
        }

        $output = curl_exec($ch);

        $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if ($httpcode != '200') {
            curl_close($ch);
            throw new CloudwaysApiFailedRequestException('An error occurred code: ' . $httpcode . ' output: ' . substr($output, 0, 10000));
        }
        curl_close($ch);
        return json_decode($output);
    }
}
