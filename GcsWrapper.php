<?php
namespace cAc\GcsWrapper;

include_once('vendor/autoload.php');
use Google\Cloud\ServiceBuilder;

class GoogleCloudStorage {

	private $json_key;
	private $project;
	private $bucket_id;
	private $objects = [];
	private $connection;
	private $storage;
	private $error_count = 0;
	
	public $bucket;
	public $acl;
	public $object;
	public $errors = [];
	
	public function __construct( $project, $key, $bucket_id ) {
	
		if( empty( $project || $key || $bucket_id ) ) {
			$this->errors[$this->error_count] = "invalid project, key, or bucket";
			$this->error_count++;
		}
		else {
			$this->project = $project;
			$this->json_key = json_decode( $key, true );
			$this->bucket_id = $bucket_id;
			$this->connect_to_gcs();
			$this->get_bucket_object();
		}
	
	}
	
	protected function connect_to_gcs() {
		
		$this->connection = new ServiceBuilder([
			'projectId'	=> $this->project,
			'keyFile'	=> $this->json_key
		]);
		$this->storage = $this->connection->storage();
	
	}
	
	protected function get_bucket_object() {
	
		$this->bucket = $this->storage->bucket($this->bucket_id);
		if( !( $this->bucket->exists() ) ) {
		
			$this->errors[$this->error_count] = 'bucket ' . $this->bucket_id . ' does not exist';
			$this->error_count++;
		
		}
	
	}

}


