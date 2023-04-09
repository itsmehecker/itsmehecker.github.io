<?php
// Emby server details
$server_url = "http://202.164.138.91:8096/";
$api_key = "56faaca8d7304e79941e700f2e9cce5f";

// Create a new event listener
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $server_url . "/emby/Subscriptions/Events?api_key=" . $api_key);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-type: application/json"));
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, '{"MessageType": "LibraryChanged"}');

// Loop indefinitely, listening for events
while (true) {
  // Wait for an event to be received
  $response = curl_exec($ch);
  
  // Process the event
  $event = json_decode($response, true);
  if ($event && isset($event["Data"]["Items"])) {
    // Handle new item added event
    foreach ($event["Data"]["Items"] as $item) {
      echo "New item added: " . $item["Name"] . "\n";
    }
  }
}
