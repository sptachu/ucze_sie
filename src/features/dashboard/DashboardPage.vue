<template>
    <div>
        <div class="flex justify-end items-center gap-40 mb-4">
            <div class="flex">
                <InputText v-model="filters['global'].value" placeholder="Szukaj zawodnika..." />
            </div>
            
            <div class="flex justify-center gap-3">
                <Button label="Wylosuj randoma" icon="pi pi-sparkles" severity="help" @click="generateRandom()" />
                <Button label="Dodaj osobę" icon="pi pi-user-plus" @click="openDialog()" />
            </div>
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
            :globalFilterFields="['firstName', 'lastName', 'fullName']"
            filterDisplay="row">


            <template #loading>
                <LoadingTableState message="Pobieranie zawodników..." />
            </template>

            <template #empty>
                <EmptyTableState :isLoading="isLoading" title="Brak zawodników" />
            </template>

            
            <Column field="firstName" sortable header="Imię" style="width: 25%"></Column>
            <Column field="lastName" sortable header="Nazwisko" style="width: 25%">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText 
                        v-model="filterModel.value" 
                        type="text" 
                        @input="filterCallback()" 
                        placeholder="Szukaj nazwiska..." 
                    />
                </template>
            </Column>
            <Column field="gender" sortable header="Płeć" style="width: 20%">
                <template #filter="{ filterModel, filterCallback }">
                    <Select 
                        v-model="filterModel.value" 
                        :options="genderOptions" 
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Wybierz..." 
                        @change="filterCallback()" 
                        showClear 
                    />
                </template>
            </Column>
            <Column field="dateOfBirth" sortable header="data urodzenia" style="width: 15%"></Column>

            <Column header="Akcje" style="width: 15%">
                <template #body="{ data }">
                    <div class="flex gap-3 justify-center">
                        <Button 
                            icon="pi pi-chart-bar" 
                            severity="info" 
                            outlined 
                            rounded 
                            v-tooltip="'Profil i wyniki'"
                            @click="goToResults(data.id)" 
                        />
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
import Select from 'primevue/select';
import Tooltip from 'primevue/tooltip';
import InputText from 'primevue/inputtext';
import AddingDialog from '@/features/dashboard/components/AddingDialog.vue';
import DeleteDialog from '@/features/shared/components/DeleteDialog.vue';
import useDashboard from '@/features/dashboard/composables/useDashboard';
import { useAddingDialog } from '@/features/dashboard/composables/useAddingDialog';
import { useDeleteUser } from '@/features/dashboard/composables/useDeleteDialog';
import { useRandomPerson } from './composables/useRandomUser';
import LoadingTableState from '@/features/shared/components/LoadingTableState.vue';
import EmptyTableState from '@/features/shared/components/EmptyTableState.vue';
import { useRouter } from 'vue-router'; 

const vTooltip = Tooltip;
const router = useRouter();
const {peopleList, isLoading} = useDashboard()
const { generateRandom } = useRandomPerson();
const { confirmDeletion } = useDeleteUser();
const { 
    visible, formData, genderOptions, dialogHeader, 
    submitLabel, openDialog, closeDialog, savePerson, isSubmitting
} = useAddingDialog();


const filters = ref({
    global: { value: null, matchMode: 'contains' },
    lastName: {value: null, matchMode: 'startsWith'},
    gender: {value: null, matchMode: 'equals'}
}); 

const goToResults = (id: string) => {
    router.push(`/results/${id}`);
};

// / zeby sie na nakladalo ladowanie i brak zawodnikow i jak zrobic zeby ctrl / robilo komentarz
// dodaj jakis wykers z chartjs z najlepszymi zawodnikami albo wykres jakie czasy robią na koniec
// dodac kolumny keidy stworzno rekord i kiedy zmodyfikowane
// zmien uklad na gorze |wyszukiwaarka   {odstęp}        buttony|
// filtry kolumnowe na płeć i nazwisko      

</script>