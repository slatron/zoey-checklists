<template>
  <div class="bonusday-area">
    <h2>WEEKLY BONUS</h2>
    <form @submit.prevent>

      <div class="colset">
        <section class="small">
          $1
        </section>
        <section class="small">
          <span v-show="trash_complete">√</span>
        </section>
        <section class="full">
          <h3>Take Out the Trash</h3>
          <div class="colset">
            <section class="label">
              <label for="trash_kitchen">KITCHEN</label>
            </section>
            <section class="small">
              <input type="checkbox" id="trash_kitchen" name="trash_kitchen" v-model="form_data.trash.kitchen">
            </section>
            <section class="full">&nbsp;</section>
          </div>
          <div class="colset">
            <section class="label">
              BATHROOMS
            </section>
            <section class="small">
              <input type="checkbox" id="trash_bath_kid" name="trash_bath_kid" v-model="form_data.trash.bath_kid">
              <label for="trash_bath_kid">K</label>
            </section>
            <section class="full">
              <input type="checkbox" id="trash_bath_parent" name="trash_bath_parent" v-model="form_data.trash.bath_parent">
              <label for="trash_bath_parent">P</label>
            </section>
          </div>
          <div class="colset">
            <section class="label">
              BEDROOMS
            </section>
            <section class="small">
              <input type="checkbox" id="trash_bed_zoey" name="trash_bed_zoey" v-model="form_data.trash.bed_zoey">
              <label for="trash_bed_zoey">Z</label>
            </section>
            <section class="full">
              <input type="checkbox" id="trash_bed_andy" name="trash_bed_andy" v-model="form_data.trash.bed_andy">
              <label for="trash_bed_andy">A</label>
            </section>
          </div>
        </section>
      </div>

      <div class="colset">
        <section class="small">
          $1
        </section>
        <section class="small">
          <span v-show="blinds_complete">√</span>
        </section>
        <section class="full">
          <h3>Dust the Blinds</h3>
          <div class="colset">
            <section class="label">
              <label for="blinds_living">LIVING ROOM</label>
            </section>
            <section class="full">
              <input type="checkbox" id="blinds_living" name="blinds_living" v-model="form_data.blinds.living">
            </section>
          </div>
          <div class="colset">
            <section class="label">
              BEDROOMS
            </section>
            <section class="small">
              <input type="checkbox" id="blinds_bed_zoey" name="blinds_bed_zoey" v-model="form_data.blinds.bed_zoey">
              <label for="blinds_bed_zoey">Z</label>
            </section>
            <section class="small">
              <input type="checkbox" id="blinds_bed_andy" name="blinds_bed_andy" v-model="form_data.blinds.bed_andy">
              <label for="blinds_bed_andy">A</label>
            </section>
            <section class="full">
              <input type="checkbox" id="blinds_bed_parent" name="blinds_bed_parent" v-model="form_data.blinds.bed_parent">
              <label for="blinds_bed_parent">P</label>
            </section>
          </div>
        </section>
      </div>

      <div class="colset">
        <section class="small">
          $1
        </section>
        <section class="small">
          <span v-show="kitchen_laundry_complete">√</span>
        </section>
        <section class="full">
          <h3>Kitchen Laundry</h3>
          <div class="colset">
            <section class="label">
              <label for="kitchen_laundry_wash">WASH</label>
            </section>
            <section class="full">
              <input type="checkbox" id="kitchen_laundry_wash" name="kitchen_laundry_wash" v-model="form_data.kitchen_laundry.wash">
            </section>
          </div>
          <div class="colset">
            <section class="label">
              <label for="kitchen_laundry_dry">DRY</label>
            </section>
            <section class="full">
              <input type="checkbox" id="kitchen_laundry_dry" name="kitchen_laundry_dry" v-model="form_data.kitchen_laundry.dry">
            </section>
          </div>
          <div class="colset">
            <section class="label">
              <label for="kitchen_laundry_fold">FOLD</label>
            </section>
            <section class="full">
              <input type="checkbox" id="kitchen_laundry_fold" name="kitchen_laundry_fold" v-model="form_data.kitchen_laundry.fold">
            </section>
          </div>
          <div class="colset">
            <section class="label">
              <label for="kitchen_laundry_put_away">AWAY</label>
            </section>
            <section class="full">
              <input type="checkbox" id="kitchen_laundry_put_away" name="kitchen_laundry_put_away" v-model="form_data.kitchen_laundry.put_away">
            </section>
          </div>
        </section>
      </div>

      <div class="colset">
        <section class="small">
          $2
        </section>
        <section class="small">
          <span v-show="vacuum_complete">√</span>
        </section>
        <section class="full">
          <h3>Vacuuming</h3>
          <div class="colset">
            <section class="label">
              <label for="vacuum_bed_zoey">BEDROOM</label>
            </section>
            <section class="full">
              <input type="checkbox" id="vacuum_bed_zoey" name="vacuum_bed_zoey" v-model="form_data.vacuum.bed_zoey">
            </section>
          </div>
          <div class="colset">
            <section class="label">
              <label for="vacuum_kitchen">KITCHEN</label>
            </section>
            <section class="full">
              <input type="checkbox" id="vacuum_kitchen" name="vacuum_kitchen" v-model="form_data.vacuum.kitchen">
            </section>
          </div>
          <div class="colset">
            <section class="label">
              <label for="vacuum_living">LIVING ROOM</label>
            </section>
            <section class="full">
              <input type="checkbox" id="vacuum_living" name="vacuum_living" v-model="form_data.vacuum.living">
            </section>
          </div>
        </section>
      </div>

      <div class="checklist-item">
        <label
          v-if="user_logged_in"
          :class="{'done': form_data.approved}"
          class="approved"
          for="cb-approved">
          Approved
          <font-awesome-icon icon="laugh-wink" />
          <input type="checkbox" name="cb-approved" id="cb-approved" v-model="form_data.approved">
        </label>
      </div>

      <textarea v-model="form_data.comments" placeholder="Comments"></textarea>
      <button
        v-if="!finished && user_logged_in && form_data.approved"
        @click="saveDay()"
        class="but-save">
        SAVE
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'BonusAdd',
  computed: {
    form_data () {
      return this.$store.state.bonus.form_data
    },
    user_logged_in () {
      return this.$store.state.auth.user_logged_in
    },
    finished () {
      return this.$store.state.bonus.day_finished
    },
    trash_complete () {
      return this.form_data.trash.bath_parent &&
             this.form_data.trash.bath_kid &&
             this.form_data.trash.bed_andy &&
             this.form_data.trash.bed_zoey &&
             this.form_data.trash.kitchen
    },
    blinds_complete () {
      return this.form_data.blinds.bed_parent &&
             this.form_data.blinds.living &&
             this.form_data.blinds.bed_andy &&
             this.form_data.blinds.bed_zoey
    },
    kitchen_laundry_complete () {
      return this.form_data.kitchen_laundry.dry &&
             this.form_data.kitchen_laundry.fold &&
             this.form_data.kitchen_laundry.put_away &&
             this.form_data.kitchen_laundry.wash
    },
    vacuum_complete () {
      return this.form_data.vacuum.living &&
             this.form_data.vacuum.kitchen &&
             this.form_data.vacuum.bed_zoey
    }
  },
  methods: {
    saveDay: function() {
      let post_data = this.form_data
      post_data.approved = true
      this.$store.dispatch('SAVE_BONUSDAY', {
        'post_data': post_data
      })
    }
  }
}
</script>

<style scoped lang="scss">
textarea {
  width: 100%;
  min-height: 100px;
  font-size: 36px;
}

h2 {text-align: center;}
h3 {margin: 0}

.colset {
  display: flex;
  flex-direction: row;
  margin: 0.5em;
}

.colset > section {
  background: #eee;
  padding: 0.5em;
}

.colset > section.small {
  text-align: center;
  width: 40px;
}

.colset > section.label {
  width: 108px;
}

.colset > section.full {
  flex-grow: 1;
}
</style>
