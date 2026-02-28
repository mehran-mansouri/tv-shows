<template>
  <div class="header">
    <div class="items-wrapper">
      <RouterLink to="/" class="link">Home</RouterLink>
      <IconField>
        <InputIcon>
          <img :src="SearchIcon" class="search-icon" alt="search-icon" />
        </InputIcon>
        <InputText
          placeholder="Search"
          v-model="searchTerm"
          @input="showSuggestions"
          class="search-field"
        />
      </IconField>
    </div>
    <div class="suggestions-popup" v-if="showSearchOverlay">
      <div class="suggestions-wrapper">
        <ProgressSpinner v-if="isLoading" class="suggestion-spinner" />
        <ul v-else>
          <li v-for="suggestion in suggestions" :key="suggestion.id">
            <RouterLink
              :to="`/${suggestion.id}`"
              class="suggestion"
              @click="resetSuggestions"
              :aria-label="`Open details for ${suggestion.name}`"
            >
              <img
                :src="suggestion.image?.medium ?? NoImage"
                alt="show image"
                class="suggestion-image"
              />
              <div class="suggestion-title">
                {{ suggestion.name }}
              </div>
            </RouterLink>
          </li>
          <div v-if="!suggestions.length" class="suggestion-empty">no result found</div>
        </ul>
      </div>
    </div>
  </div>
  <div class="search-overlay" :style="{ zIndex: showSearchOverlay ? 2 : -1 }" />
  <div class="fill-space" />
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import ProgressSpinner from 'primevue/progressspinner'
import SearchIcon from '@/assets/search.svg'
import NoImage from '@/assets/no-image.webp'
import useSearch from '@/composables/useSearch'
import { ref, watch } from 'vue'

defineOptions({
  name: 'HeaderComponent',
})

const { isLoading, searchTerm, suggestions } = useSearch()
const showSearchOverlay = ref(false)

const showSuggestions = () => {
  showSearchOverlay.value = true
}

const hideSuggestions = () => {
  showSearchOverlay.value = false
}

const resetSuggestions = () => {
  suggestions.value = []
  searchTerm.value = ''
}

watch(searchTerm, (value) => {
  if (!value) hideSuggestions()
})
</script>

<style scoped lang="scss">
@use '../../styles/tokens' as tokens;

$headerHeight: 70px;

a {
  text-decoration: none;
}

.header {
  background: tokens.$background-color-primary;
  height: $headerHeight;
  opacity: 0.95;
  position: fixed;
  top: 0;
  width: calc(100vw - #{tokens.$spacing-200});
  z-index: 10;
}

.items-wrapper {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: tokens.$spacing-100;
}

.link {
  color: tokens.$color-white;
  font-size: tokens.$font-size-200;
}

.search {
  &-field {
    @media only screen and (max-width: tokens.$breakpoint-sm) {
      width: 150px;
    }
  }

  &-icon {
    margin-top: -#{tokens.$spacing-25};
    width: 24px;
  }

  &-overlay {
    background-color: tokens.$color-black;
    height: 100vh;
    left: 0;
    opacity: 0.9;
    padding-top: $headerHeight;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 1;
  }
}

.fill-space {
  height: $headerHeight;
}

.suggestions {
  &-popup {
    background-color: tokens.$color-white;
    position: fixed;
    padding: tokens.$spacing-25;
    top: $headerHeight + tokens.$spacing-25;
    right: 24px;
    z-index: 1001;
  }

  &-wrapper {
    width: 240px;

    & > ul {
      list-style: none;
      padding: 0;
    }
  }
}

.suggestion {
  align-items: center;
  display: flex;
  gap: tokens.$spacing-50;
  margin: tokens.$spacing-25 0;

  &-spinner {
    margin: 0 calc(50% - 12px);
    width: 24px;
  }

  &-image {
    aspect-ratio: 30 / 42;
    width: 30px;
  }

  &-title {
    color: tokens.$color-black;
  }

  &-empty {
    color: tokens.$color-black;
    text-align: center;
  }
}
</style>
