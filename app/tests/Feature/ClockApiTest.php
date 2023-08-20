<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClockApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_clock_offset_can_be_fetched(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/api/user_settings');

        $response->assertJsonStructure(['data']);

        $user->load('settings');

        $this->assertSame($response->decodeResponseJson()["data"]["clock_offset"], $user->settings->clock_offset);
    }

    public function test_clock_offset_can_be_updated(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->post('/api/user_settings', [
                'clock_offset' => 1,
            ]);

        $user->refresh();
        $user->load('settings');

        $this->assertSame(1, $user->settings->clock_offset);
    }
}
