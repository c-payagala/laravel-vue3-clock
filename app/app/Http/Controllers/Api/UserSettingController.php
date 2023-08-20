<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserSettingRequest;
use App\Http\Resources\UserSettingResource;
use App\Models\UserSetting;
use App\Services\UserSettingService;

class UserSettingController extends Controller
{
    /*
     * Update or create user setting of the authenticated user
     *
     * @param UserSettingRequest $request
     * @return UserSettingResource
     */
    public function store(UserSettingRequest $request, UserSettingService $userSettingService): UserSettingResource
    {
        return new UserSettingResource($userSettingService->store($request->validated()));
    }

    /*
     * Show user settings of the authenticated user
     *
     * @return UserSettingResource
     *
     */
    public function show(UserSettingService $userSettingService): UserSettingResource
    {
        return new UserSettingResource($userSettingService->fetch());
    }

    /* public function destroy(UserSetting $userSetting)
    {
        $userSetting->delete();
        return response()->noContent();
    } */
}
