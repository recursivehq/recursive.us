<template>
  <div id="app">
    <input v-model="grossAmount" type="text" />
    <table role="table" aria-colcount="2" class="table b-table table-striped table-hover">
      <thead role="rowgroup" class>
        <tr role="row" class>
          <th role="columnheader" scope="col" aria-colindex="1"></th>
          <th role="columnheader" scope="col" aria-colindex="2">Independent Contractor 1099</th>
          <th role="columnheader" scope="col" aria-colindex="3">Recursive W2</th>
        </tr>
      </thead>
      <tbody role="rowgroup">
        <tr role="row" class>
          <td aria-colindex="1" role="cell">Membership Fee</td>
          <td aria-colindex="2" role="cell">{{ membershipFee1099 }}</td>
          <td aria-colindex="3" role="cell">{{ membershipFeeW2 }}</td>
        </tr>
        <tr role="row" class>
          <td aria-colindex="1" role="cell">Self-Employment Tax</td>
          <td aria-colindex="2" role="cell">{{ selfEmploymentTax1099 }}</td>
          <td aria-colindex="2" role="cell">{{ selfEmploymentTaxW2 }}</td>
        </tr>
        <tr role="row" class>
          <td aria-colindex="1" role="cell">Social Security & Medicare</td>
          <td aria-colindex="2" role="cell">{{ ssMedicare1099 }}</td>
          <td aria-colindex="2" role="cell">{{ ssMedicareW2 }}</td>
        </tr>
        <tr role="row" class>
          <td aria-colindex="1" role="cell">Federal Withholding</td>
          <td aria-colindex="2" role="cell">{{ federal1099 }}</td>
          <td aria-colindex="2" role="cell">{{ federalW2 }}</td>
        </tr>
        <tr role="row" class>
          <td aria-colindex="1" role="cell">Michigan Withholding</td>
          <td aria-colindex="2" role="cell">{{ state1099 }}</td>
          <td aria-colindex="2" role="cell">{{ stateW2 }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr role="row">
          <td aria-colindex="1" role="cell">Net Pay</td>
          <td aria-colindex="2" role="cell">{{ total1099 }}</td>
          <td aria-colindex="3" role="cell">{{ totalW2 }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grossAmount: 123
    };
  },
  computed: {
    // 1099
    //
    membershipFee1099: function() {
      return 0;
    },
    selfEmploymentTax1099: function() {
      return this.grossAmount * 0.153;
    },
    ssMedicare1099: function() {
      return 0;
    },
    federal1099: function() {
      return this.grossAmount * 0.12;
    },
    state1099: function() {
      return this.grossAmount * 0.0425;
    },
    total1099: function() {
      return (
        this.grossAmount -
        [
          this.membershipFee1099,
          this.selfEmploymentTax1099,
          this.ssMedicare1099,
          this.federal1099,
          this.state1099
        ].reduce((acc, val) => {
          acc = Number(acc) + Number(val);
          return acc;
        }, 0)
      );
    },
    // W2
    //
    membershipFeeW2: function() {
      return 0.1 * Number(this.grossAmount);
    },
    netW2: function() {
      return Number(this.grossAmount) - this.membershipFeeW2;
    },
    selfEmploymentTaxW2: function() {
      return 0;
    },
    ssMedicareW2: function() {
      return this.netW2 * 0.0765;
    },
    federalW2: function() {
      return this.netW2 * 0.12;
    },
    stateW2: function() {
      return this.netW2 * 0.0425;
    },
    totalW2: function() {
      return (
        this.grossAmount -
        [
          this.membershipFeeW2,
          this.selfEmploymentTaxW2,
          this.ssMedicareW2,
          this.federalW2,
          this.stateW2
        ].reduce((acc, val) => {
          acc = Number(acc) + Number(val);
          return acc;
        }, 0)
      );
    }
  }
};
</script>

<style>
.table tfoot td {
  font-size: 30px;
  font-weight: 700;
}
</style>