<script setup>
    import { ref } from 'vue';
    import moment from 'moment';

    const time = ref(moment().format('LTS'));

    setInterval(() => {
        time.value = moment().format('LTS');
    }, 1000);

</script>

<template>
    <div class="flex justify-center items-center bg-gradient-to-br from-indigo-600 to-indigo-900 p-20">
        <h1>Time: {{ time }}</h1>
    </div>
</template>

<style scoped>

</style>
