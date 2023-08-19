import { ref } from 'vue';
import axios from 'axios';

export default function useUserSettings() {
    const userSetting = ref({clock_offset: 0});

    const errors = ref('');

    const getUserSettings = async () => {
        errors.value = '';
        try {
            let response = await axios.get(`/api/user_settings`);
            console.log(response.data.data);
            userSetting.value = response.data.data;
        } catch (e) {
            console.log(e.response.data.message);
            errors.value = e.response.data.message;
        }

    }

    const storeUserSettings = async (data) => {
        errors.value = '';
        try {
            const response = await axios.post('/api/user_settings', data);
            console.log(response.data.data);
            userSetting.value = response.data.data;
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors;
                }
            } else {
                errors.value = e.response.data.message;
            }
        }
    }

    return {
        errors,
        userSetting,
        getUserSettings,
        storeUserSettings
    }
}
