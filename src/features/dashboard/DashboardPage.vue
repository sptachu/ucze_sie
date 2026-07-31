<template>
    <div>
        <div class="flex justify-center mb-6 gap-3">
            <Button label="Wylosuj randoma" icon="pi pi-sparkles" severity="help" @click="generateRandom()" />
            <Button label="Dodaj osobę" icon="pi pi-user-plus" @click="openDialog()" />
        </div>

        <DataTable :value="peopleStore.peopleList" showGridlines tableStyle="min-width: 50rem" emptyMessage="Brak zawodników.">
            
            <Column field="firstName" header="Imię" style="width: 25%"></Column>
            <Column field="lastName" header="Nazwisko" style="width: 25%"></Column>
            <Column field="gender" header="Płeć" style="width: 20%"></Column>
            <Column field="pb5k" header="PB (5km)" style="width: 15%"></Column>

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
    />
    <deleteDialog/>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import AddingDialog from '@/features/dashboard/components/AddingDialog.vue';
import DeleteDialog from '@/features/dashboard/components/DeleteDialog.vue';
import useDashboard from '@/features/dashboard/composables/useDashboard';
import { useAddingDialog } from '@/features/dashboard/composables/useAddingDialog';
import { useDeleteUser } from '@/features/dashboard/composables/useDeleteDialog';
import { useRandomPerson } from './composables/useRandomuser';

const { peopleStore} = useDashboard();
const { generateRandom } = useRandomPerson();
const { confirmDeletion } = useDeleteUser();
const { 
    visible, formData, genderOptions, dialogHeader, 
    submitLabel, openDialog, closeDialog, savePerson 
} = useAddingDialog();
</script>