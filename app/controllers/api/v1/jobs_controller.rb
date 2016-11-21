require 'json'
require 'open-uri'
module Api
  module V1
    class JobsController < ApplicationController
    before_action :authenticate_user, only: [:create, :signup, :is_signedup]
      def index
        coords = {lat: params["lat"], lng: params["lng"]}
        loc = Geokit::LatLng.new(coords[:lat],coords[:lng])
        jobs = Job.within(10,origin: loc)

        render json: jobs.to_json
      end

      def signup
        job = Job.find(params["jobId"])
        user = current_user
        owner = job.user
        if(owner != user)
          Contract.create(
            employee: user,
            job: job,
            user: owner
          )
          render json: {status: 'success'}
        else
          render json: {status: 'fail'}
        end
      end

      def is_signedup
        job = Job.find(params["jobId"])
        user = current_user
        contracts = Contract.where(job:job, employee: user)
        if contracts.length > 0
          render json: {contract: contracts[0].to_json}
        else
          render json: {contract: false}
        end
      end

      def create
        valid_address = true
        user = current_user
        lookup = Geocoder.search(params["job"]["address"])

        job = Job.new(job_params)
        job.user = current_user

        if(lookup[0] == nil)
          valid_address = false
        end

        if(job.valid? && valid_address)
          loc = Geocoder.search(params["job"]["address"])[0].coordinates
          job.lat = loc[0]
          job.lng = loc[1]
          job.save
          render json: {status: 'success'}
        else
          if(valid_address)
            render json: {errors: job.errors.full_messages}
          else
            errors = job.errors
            errors["address"] = ["Address is invalid!"]
            render json: {errors: errors}
          end
        end
      end

      def job_params
        params.require(:job).permit(:title, :description, :address, :hourly_rate)
      end

    end
  end
end