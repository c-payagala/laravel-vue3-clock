import { defineStore } from "pinia";
import axios from "axios";

export const useSettingsStore = defineStore({
    id: "settings",
    state: () => ({
        userSetting: {
            clock_offset: null
        },
        errors: ''
    }),
    actions: {
        async getUserSettings() {
            this.errors = '';
            try {
                let response = await axios.get(`/api/user_settings`);
                console.log(response.data.data);
                this.userSetting = response.data.data;
            } catch (e) {
                console.log(e.response.data.message);
                this.errors = e.response.data.message;
            }
        },
        async storeUserSettings(data) {
            this.errors = '';
            try {
                const response = await axios.post('/api/user_settings', data);
                console.log(response.data.data);
                this.userSetting = response.data.data;
            } catch (e) {
                if (e.response.status === 422) {
                    for (const key in e.response.data.errors) {
                        this.errors = e.response.data.errors;
                    }
                } else {
                    this.errors = e.response.data.message;
                }
            }
        }
    },
    getters: {
        getErrors() {
            return this.errors;
        },
        getUserSetting() {
            return this.userSetting;
        }
    }
});
