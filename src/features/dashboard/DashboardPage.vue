<template>
    <div>
        <div class="flex justify-center mb-6 gap-3">
            <Button label="Wylosuj randoma" icon="pi pi-sparkles" severity="help" @click="generateRandom()" />
            <Button label="Dodaj osobę" icon="pi pi-user-plus" @click="openDialog()" />
        </div>

        <DataTable 
            :value="peopleList" 
            :loading="isLoading" 
            paginator 
            :rows="10" 
            :rowsPerPageOptions="[5,10,15,20,50]" 
            showGridlines 
            tableStyle="min-width: 50rem" 
            emptyMessage="Brak zawodników." 
            v-model:filters="filters"
            :globalFilterFields="['firstName', 'lastName', 'fullName']">

            <template #header>
                <div class="flex justify-center">
                    <InputText v-model="filters['global'].value" placeholder="Szukaj zawodnika..." />
                </div>
            </template>

            <template #loading>
                <div class="flex flex-col items-center justify-center p-8">
                    <i class="pi pi-spin pi-spinner text-4xl text-purple-500 mb-4"></i>
                    <span class="text-xl font-bold text-gray-600">Pobieranie zawodników...</span>
                </div>
            </template>

            <template #empty>
                <div class="flex flex-col items-center justify-center p-8">
                    <i class="pi pi-users text-4xl text-gray-400 mb-4"></i>
                    <span class="text-xl font-bold text-gray-600 mb-2">Brak zawodników</span>
                    <span class="text-gray-500 text-sm">Nie znaleziono żadnych rekordów do wyświetlenia.</span>
                </div>
            </template>
            
            <Column field="firstName" sortable header="Imię" style="width: 25%"></Column>
            <Column field="lastName" sortable header="Nazwisko" style="width: 25%"></Column>
            <Column field="gender" sortable header="Płeć" style="width: 20%"></Column>
            <Column field="pb5k" sortable header="PB (5km)" style="width: 15%"></Column>

            <Column header="Akcje" style="width: 15%">
                <template #body="{ data }">
                    <div class="flex gap-3 justify-center">
                        <Button icon="pi pi-pencil" outlined rounded @click="openDialog(data)" />
                        <Button icon="pi pi-trash" severity="danger" outlined rounded @click="confirmDeletion(data.id, data.firstName)" />
                    </div>
                </template>
            </Column>

        </DataTable>
    </div>
    <addingDialog 
    :visible="visible"
    @update:visible="visible = $event"
    :formData="formData"
    :genderOptions="genderOptions"
    :dialogHeader="dialogHeader"
    :submitLabel="submitLabel"
    @close="closeDialog"
    @save="(updatedData) => savePerson(updatedData)"
    :isSubmitting="isSubmitting"
    />
    <deleteDialog/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import AddingDialog from '@/features/dashboard/components/AddingDialog.vue';
import DeleteDialog from '@/features/dashboard/components/DeleteDialog.vue';
import useDashboard from '@/features/dashboard/composables/useDashboard';
import { useAddingDialog } from '@/features/dashboard/composables/useAddingDialog';
import { useDeleteUser } from '@/features/dashboard/composables/useDeleteDialog';
import { useRandomPerson } from './composables/useRandomUser';

const {peopleList, isLoading} = useDashboard()
const { generateRandom } = useRandomPerson();
const { confirmDeletion } = useDeleteUser();
const { 
    visible, formData, genderOptions, dialogHeader, 
    submitLabel, openDialog, closeDialog, savePerson, isSubmitting
} = useAddingDialog();

const filters = ref({
    global: { value: null, matchMode: 'contains' } 
});

 // useDashboardPage i tam wszyskie crud z serwisu w kazdej funkcji lacze sie z serwisem i ogarniam dane. w usedashboardpage lacze sie tez z peoplestore. ten usedashboardpage ma zwracac cala tablice userow
</script>