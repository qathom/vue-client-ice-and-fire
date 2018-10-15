<template>
  <div>
    <div class="filters-container">
      <div class="row align-items-end">
        <div class="col-sm-8">
          <b-form-checkbox-group
            id="typeCheckboxes"
            name="types"
            class="types-checkbox-group"
            stacked
            v-model="selectedTypes">
            <div v-for="type in types" :key="type">
              <b-form-checkbox :value="type" class="stacked-checkbox">
                <div class="d-inline-block label-checkbox">
                  {{ type }}
                  <b-btn v-b-toggle="type"
                        class="px-1 py-0 float-right"
                        size="sm"
                        variant="primary"
                        v-show="selectedTypes.indexOf(type) > -1">
                    Advanced
                  </b-btn>
                </div>
              </b-form-checkbox>
              <b-collapse :id="type" class="bg-light p-2" v-show="selectedTypes.indexOf(type) > -1">
                <div class="row">
                  <div class="col-6"
                       v-for="searchable in Object.keys(params[type])"
                       :key="`${type}${searchable}`">
                    <div v-if="params[type][searchable].type === String">
                      <b-form-group :label="`${searchable}:`"
                                    :label-for="`${type}${searchable}`">
                        <b-form-input :id="`${type}${searchable}`"
                                      type="text"
                                      size="sm"
                                      v-model="params[type][searchable].value"
                                      :placeholder="`Enter ${searchable}`">
                        </b-form-input>
                      </b-form-group>
                    </div>
                    <div v-if="params[type][searchable].type === Boolean">
                      <b-form-checkbox :id="`${type}${searchable}`"
                                      v-model="params[type][searchable].value">
                        {{ searchable }}
                      </b-form-checkbox>
                    </div>
                  </div>
                </div>
              </b-collapse>
            </div>
          </b-form-checkbox-group>
        </div>
        <div class="col-sm-4">
          <b-button variant="primary"
                    class="float-right"
                    :dismiss="loading"
                    @click.prevent="fetchData">
                    Search
          </b-button>
        </div>
      </div>
    </div>
    <resource-table :items="resources" />
  </div>
</template>

<script>
import { TYPES, SEARCHABLES, getResources } from '@/api';
import ResourceTable from '@/components/ResourceTable';

const typeNames = Object.values(TYPES);

export default {
  name: 'Home',
  data() {
    return {
      resources: [],
      params: {},
      loading: false,
      types: typeNames,
      selectedTypes: typeNames,
    };
  },
  created() {
    Object.keys(SEARCHABLES).forEach((type) => {
      this.params[type] = {};
      Object.keys(SEARCHABLES[type]).forEach((key) => {
        this.params[type][key] = {};
        this.params[type][key].type = SEARCHABLES[type][key];

        if (SEARCHABLES[type][key] === String) {
          this.params[type][key].value = '';
        } else {
          this.params[type][key].value = false;
        }
      });
    });

    // created is sync
    this.fetchData();
  },
  methods: {
    async fetchData() {
      // reset
      this.resources = [];

      this.$Progress.start();
      this.loading = true;

      this.resources = await getResources(this.selectedTypes, this.params);
      this.setResourcesModel();

      this.$Progress.finish();

      this.loading = false;
    },
    setResourcesModel() {
      this.resources = this.resources.map((r) => {
        const res = r;

        // set ID
        const id = res.url.match(/\/([\d]{1,5})$/);
        if (id && id.length > 0) {
          res.id = id[1];
        }

        return res;
      }).filter((item, pos, arr) => arr.indexOf(item) === pos);
    },
  },
  watch: {
    selectedTypes() {
      this.fetchData();
    },
  },
  components: {
    ResourceTable,
  },
};
</script>
