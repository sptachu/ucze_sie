<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <Card class="w-full max-w-md shadow-lg">
            <template #title>
                <div class="text-center text-2xl font-bold mb-4">Zaloguj się</div>
            </template>
            <template #content>
                <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
                    
                    <div class="flex flex-col gap-1">
                        <label for="username" class="font-semibold">Nazwa użytkownika</label>
                        <InputText id="username" v-model="username" placeholder="Wpisz login" autofocus />
                    </div>
                    
                    <div class="flex flex-col gap-1">
                        <label for="password" class="font-semibold">Hasło</label>
                        <Password id="password" v-model="password" :feedback="false" toggleMask placeholder="Wpisz hasło" />
                    </div>

                    <small v-if="errorMessage" class="text-red-500 text-center">{{ errorMessage }}</small>

                    <Button type="submit" label="Zaloguj" :loading="isLoading" class="w-full mt-2" />
                </form>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { useLogin } from '@/features/shared/composables/useLogin'; 

const { username, password, errorMessage, isLoading, handleLogin } = useLogin();
</script>