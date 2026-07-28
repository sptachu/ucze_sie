<script setup>
const props = defineProps({
  btnType: {
    type: String,
    default: 'mainBtn',
    validator: (value) => ['mainBtn', 'secondary', 'danger'].includes(value)
  }
});
</script>

<template>

  <button :class="['btn', props.btnType]">  
    
    <slot>Kliknij mnie</slot>

  </button>
</template>

<style scoped>
.btn {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px; 
  cursor: pointer;
  font-family: Arial, sans-serif;
  transition: all 0.2s ease-in-out; 
}

.mainBtn {
  background-color: #3b82f6; 
  color: white;
}

.mainBtn:hover {
  background-color: #2563eb; 
  transform: translateY(-2px); 
  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3); 
}

.secondary {
  background-color: #e5e7eb; 
  color: #4b5563; 
}

.secondary:hover {
  background-color: #d1d5db; 
  transform: translateY(-2px);
}
</style>