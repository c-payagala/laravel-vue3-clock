<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserSettingRequest;
use App\Http\Resources\UserSettingResource;
use App\Models\UserSetting;

class UserSettingController extends Controller
{
    /*
     * Update or create user setting of the authenticated user
     *
     * @param UserSettingRequest $request
     * @return UserSettingResource
     */
    public function store(UserSettingRequest $request): UserSettingResource
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->user()->id;
        $userSetting = UserSetting::updateOrCreate(['user_id' => auth()->user()->id], $validated);
        return new UserSettingResource($userSetting);
    }

    /*
     * Show user settings of the authenticated user
     *
     * @return UserSettingResource
     *
     */
    public function show(): UserSettingResource
    {
        $userSetting = UserSetting::firstOrCreate(
            ['user_id' => auth()->user()->id],
            ['clock_offset' => 0]
        );
        return new UserSettingResource($userSetting);
    }

    /* public function destroy(UserSetting $userSetting)
    {
        $userSetting->delete();
        return response()->noContent();
    } */
}
