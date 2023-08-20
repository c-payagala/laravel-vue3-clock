import { ref } from 'vue';
import {useSettingsStore} from "@/stores/settings.js";
import {storeToRefs} from "pinia";
import debounce from "lodash/debounce.js";

export default function useUserSettings() {

    const settingsStore = useSettingsStore();

    const { userSetting, errors} = storeToRefs(settingsStore);

    const saveUserSetting = debounce(async (val = null , callback) => {
        console.log('save');
        await settingsStore.storeUserSettings({
            //user_id: usePage().props.auth.user.id,
            clock_offset: val === null ? userSetting.value.clock_offset : val
        });

        if (errors.value.length > 0) {
            callback(errors.value, 'error');
        } else {
            callback(val === 0 ? 'Settings cleared!' : 'Settings saved!');
        }
    }, 1000);

    const offsetFormatted = () => {
        let seconds = userSetting.value.clock_offset;
        const hours = Math.floor(Math.abs(seconds) / 3600);
        seconds %= 3600;
        const minutes = Math.floor(Math.abs(seconds) / 60);
        seconds %= 60;
        seconds = Math.abs(seconds);

        const formatted =  [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .join(":");

        return userSetting.value.clock_offset < 0 ? "-" + formatted : formatted;
    }

    return {
        errors,
        userSetting,
        getUserSettings: settingsStore.getUserSettings,
        saveUserSetting,
        offsetFormatted
    }
}
