<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\UserSetting;
use App\Services\UserSettingService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class UserSettingServiceTest extends TestCase
{
    use RefreshDatabase;

    protected UserSettingService $userSettingService;

    protected function setUp(): void
    {
        parent::setUp();

        $this->userSettingService = new UserSettingService();
    }

    public function testFetchCreatesNewSettingIfNotExists()
    {
        $user = User::factory()->create();

        Auth::login($user);

        $setting = $this->userSettingService->fetch();

        $this->assertInstanceOf(UserSetting::class, $setting);
        $this->assertEquals(0, $setting->clock_offset);
    }

    public function testStoreCreatesOrUpdatesSetting()
    {
        $user = User::factory()->create();
        Auth::login($user);

        $settings = ['clock_offset' => 120];
        $setting = $this->userSettingService->store($settings);

        $this->assertInstanceOf(UserSetting::class, $setting);
        $this->assertEquals(120, $setting->clock_offset);

        // Test update
        $newSettings = ['clock_offset' => 240];
        $updatedSetting = $this->userSettingService->store($newSettings);

        $this->assertEquals(240, $updatedSetting->clock_offset);
    }
}
