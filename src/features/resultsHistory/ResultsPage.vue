<template>
    <div class="p-6">
        <div  class="flex gap-8 mb-6">
            <Button 
                icon="pi pi-arrow-left" 
                label="Wróć do listy"  
                outlined 
                @click="router.back()" 
            />

            <Button label="Dodaj wynik" icon="pi pi-user-plus" @click="openResultDialog()" />
        </div>
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
                    <template #empty>
                        <EmptyTableState  title="Brak rekordów" />
                    </template>
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

                <template #empty>
                    <EmptyTableState  title="Brak wyników"  description="Nie znaleziono żadnych wyników do wyświetlenia"/>
                </template>

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
    <AddingResultDialog 
        :visible="visible"
        @update:visible="visible = $event"
        :form-data="formData"
        :activity-options="activityOptions"
        :distance-options="distanceOptions"
        :dialog-header="dialogHeader"
        :submit-label="submitLabel"
        :is-submitting="isSubmitting"
        @close="closeDialog"
        @save="saveResult"
    />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import { usePersonResults } from './composables/useResults';
import EmptyTableState from '@/features/shared/components/EmptyTableState.vue';
import { useAddingResultDialog } from './composables/useAddingResultDialog';
import AddingResultDialog from './components/AddingResultDialog.vue';

const { 
    personInfoTable, 
    personalBests, 
    personRecords,
    personId 
} = usePersonResults();

const { visible, formData, activityOptions,distanceOptions, dialogHeader, submitLabel, isSubmitting, openResultDialog, closeDialog, saveResult } = useAddingResultDialog(personId);

const router = useRouter();


</script>