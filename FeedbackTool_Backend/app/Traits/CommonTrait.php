<?php

namespace App\Traits;

trait CommonTrait
{
    protected function getFeedbackCategories()
    {
        return [
            'Product Feedback',
            'Feature Requests',
            'Bug Reports',
            'Customer Reviews & In-app Ratings',
            'Complaints & Questions',
            'Praise & Appreciation Posts',
            'Customer Surveys',
            'Net Promoter Score (NPS) Surveys',
            'Customer Satisfaction Survey',
            'Customer Effort Score Feedback',
            'Sales Objections & Feedback',
            'Customer Feedback',
            'Customer Complain',
        ];
    }
}
