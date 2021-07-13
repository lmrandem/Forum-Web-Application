<?php

require_once 'service/subscription.php';

class SubscriptionController {

    private $subscriptionService;

    public function __construct() {
        $this->subscriptionService = new SubscriptionService();
    }

    public function list(Request $request, Response $response): Response {
        $subscriptions = $this->subscriptionService->listSubscriptions($request->user['id']);
        return $response->status(200)->json(['success'=>true, 'data'=>$subscriptions]);
    }

    public function get(Request $request, Response $response): Response {
        if (!isset($request->params['board'])) {
            return $response->status(400)->json(['success'=>false, 'message'=>'Missing identifier']);
        }
        $subscription = $this->subscriptionService->getSubscription($request->params['board'], $request->user['id']);
        if (!$subscription) {
            return $response->status(404)->json(['success'=>false, 'message'=>'Subscription not found']);
        }
        return $response->status(200)->json(['success'=>true, 'data'=>$subscription]);
    }

    public function subscribe(Request $request, Response $response): Response {
        if (!isset($request->params['board'])) {
            return $response->status(400)->json(['success'=>false, 'message'=>'Missing input']);
        }

        // Check if subscription exist
        $isAlreadySubscribed = $this->subscriptionService->getSubscription($request->params['board'], $request->user['id']);
        if ($isAlreadySubscribed) {
            return $response->status(400)->json(['success'=>false, 'message'=>'User already subscribed']);
        }

        // If no subscription, subscribe to board
        $subscribed = $this->subscriptionService->subscribeToBoard($request->params['board'], $request->user['id']);
        if (!$subscribed) {
            return $response->status(500)->json(['success'=>false, 'message'=>'Something went wrong']);
        }

        return $response->status(200)->json(['success'=>true, 'message'=>'Subscribed']);
    }

    public function unsubscribe(Request $request, Response $response): Response {
        if (!isset($request->params['board'])) {
            return $response->status(400)->json(['success'=>false, 'message'=>'Missing input']);
        }

        // Check if subscription exist
        $isAlreadySubscribed = $this->subscriptionService->getSubscription($request->params['board'], $request->user['id']);
        if (!$isAlreadySubscribed) {
            return $response->status(400)->json(['success'=>false, 'message'=>'User not subscribed']);
        }

        // If subscribed, unsubscribe from board
        $unsubscribed = $this->subscriptionService->unsubscribeFromBoard($request->params['board'], $request->user['id']);
        if (!$unsubscribed) {
            return $response->status(500)->json(['success'=>false, 'message'=>'Something went wrong']);
        }

        return $response->status(200)->json(['success'=>true, 'message'=>'Unsubscribed']);
    }

}

?>