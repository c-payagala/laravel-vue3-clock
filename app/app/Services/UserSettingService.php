<?php

namespace App\Services;

use App\Models\UserSetting;

class UserSettingService
{
    /**
     * Fetch settings of the authenticated user. create if not exists
     * @return UserSetting
     */
    public function fetch() : UserSetting
    {
        $userSetting = UserSetting::firstOrCreate(
            ['user_id' => auth()->id()],
            ['clock_offset' => 0]
        );
        return $userSetting;
    }

    /*
     * Update or create user setting of the authenticated user
     * @param array $settings
     * @return UserSetting
     */
    public function store($settings) : UserSetting
    {
        $settings['user_id'] = auth()->id();
        $userSetting = UserSetting::updateOrCreate(['user_id' => $settings['user_id']], $settings);
        return $userSetting;
    }

}
