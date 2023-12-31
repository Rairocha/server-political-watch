const { Schema, model } = require('mongoose');

const politicianSchema = new Schema(
    {
      id: String,
      title: String,
      short_title: String,
      api_uri: String,
      first_name: String,
      middle_name: String,
      last_name: String,
      suffix: String,
      date_of_birth: String,
      gender: String,
      party: String,
      leadership_role: String,
      twitter_account: String,
      facebook_account: String,
      youtube_account: String,
      govtrack_id: String,
      cspan_id: String,
      votesmart_id: String,
      icpsr_id: String,
      crp_id: String,
      google_entity_id: String,
      fec_candidate_id: String,
      url: String,
      rss_url: String,
      contact_form: String,
      in_office: Boolean,
      cook_pvi: String,
      dw_nominate: Number,
      ideal_point: String,
      seniority: String,
      next_election: String,
      total_votes: Number,
      missed_votes: Number,
      total_present: Number,
      last_updated: String,
      ocd_id: String,
      office: String,
      phone: String,
      fax: String,
      state: String,
      senate_class: String,
      state_rank: String,
      lis_id: String,
      missed_votes_pct: Number,
      votes_with_party_pct: Number,
      votes_against_party_pct: Number,
      most_recent_vote: String,
      roles: [{type:Object}]
    }
  );


  
  module.exports = model("Politician", politicianSchema);