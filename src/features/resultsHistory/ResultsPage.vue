<template>
    <div class="p-6">
        <Button 
            icon="pi pi-arrow-left" 
            label="Wróć do listy" 
            class="mb-6" 
            outlined 
            @click="router.back()" 
        />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
                <h2 class="text-2xl font-bold mb-4 text-gray-800">Informacje o zawodniku</h2>
                <DataTable :value="personInfoTable" showGridlines :showHeaders="false">
                    <Column field="label" style="width: 40%" class="font-semibold bg-gray-50"></Column>
                    <Column field="value"></Column>
                </DataTable>
            </div>

            <div>
                <h2 class="text-2xl font-bold mb-4 text-gray-800">Rekordy życiowe</h2>
                <DataTable :value="personalBests" showGridlines emptyMessage="Brak rekordów do wyświetlenia.">
                    <Column field="distance" header="Dystans" class="font-semibold"></Column>
                    <Column field="pbRun" header="Bieg (PB)"></Column>
                    <Column field="pbBike" header="Rower (PB)"></Column>
                </DataTable>
            </div>
        </div>

        <div class="mt-8">
            <h2 class="text-2xl font-bold mb-4 text-gray-800">Pełna historia Wyników</h2>
            <DataTable 
                :value="personRecords" 
                paginator 
                :rows="10" 
                showGridlines 
                stripedRows
                emptyMessage="Ten zawodnik nie ma jeszcze żadnych wyników."
            >
                <Column field="date" header="Data startu" sortable></Column>
                <Column field="activityType" header="Dyscyplina" sortable>
                    <template #body="{ data }">
                        <Tag 
                            :value="data.activityType" 
                            :severity="data.activityType === 'Bieg' ? 'success' : 'info'" 
                        />
                    </template>
                </Column>
                <Column field="distance" header="Dystans"></Column>
                <Column field="time" header="Czas" sortable class="font-bold"></Column>
                <Column field="startLocation" header="Start"></Column>
                <Column field="endLocation" header="Meta"></Column>
                <Column field="equipment" header="Sprzęt"></Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import { usePersonResultsPage } from './composables/useResults';

const router = useRouter();

const { 
    personInfoTable, 
    personalBests, 
    personRecords 
} = usePersonResultsPage();
</script>