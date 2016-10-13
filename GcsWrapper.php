<?php
namespace cAc\GcsWrapper;

include_once('vendor/autoload.php');
use Google\Cloud\ServiceBuilder;


//$object property is set by method object_exists()
class GoogleCloudStorage {

	private $json_key;
	private $project;
	private $bucket_id;
	public $objects = [];
	private $connection;
	private $storage;
	private $error_count = 0;
	private $bucket;
	private $bucket_acl;
	private $bucket_default_acl;
	private $object;
	private $object_acl;
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
			$this->get_bucket();
			$this->get_bucket_acl();
			$this->get_bucket_default_acl();
			$this->objects = $this->bucket->objects( $options );
		}
	
	}
	
	
	/**
	 * Bucket operations
	 *
	 * Operations are: Check if bucket exists (performed upon instantiating this class), delete bucket, get bucket info
	 *
	 **/
	
	public function bucket_get_info() {
	
		return $this->bucket->info();
	
	}
	
	public function bucket_delete() {
	
		$this->bucket_acl = null;
		$this->bucket_default_acl = null;
		$this->object = null;
		$this->object_acl = null;
		$this->bucket->delete();
	
	}
	
	public function bucket_exists() {
	
		return $this->bucket->exists();
	
	}
	
	/**
	 * Bucket Object operations
	 *
	 * Operations are: Get all objects (filterable), concatenate 2 objects, upload data (simple), upload large data (resumable)
	 *
	 **/
	 
	 public function bucket_object_concatenate( $obj1, $obj2, $final_name ) {
	 
	 	$sources = array(
	 		$obj1,
	 		$obj2
	 	);
	 	$this->object = $this->bucket->compose( $sources, $final_name );
	 	get_object_acl();
	 	return $this->object;
	 
	 }
	 
	 public function bucket_upload_large_object( $source, $target_name, $use_validation = false, $permissions = "private" ) {
	 
	 	$opts = array(
	 		'name'			=> $target_name,
	 		'validate'		=> $use_validation,
	 		'predefinedAcl'	=> $permissions
	 	);
	 	$uploader = $this->bucket->getResumableUploader( $source, $opts );
	 	try {
	 		$this->object = $uploader->upload( $source, $opts );
			get_object_acl();
		}
		catch( GoogleException $ex ) {
			$resumeUri = $uploader->getResumeUri();
			$this->object = $uploader->resume($resumeUri);
			get_object_acl();
		}
		return $this->object;
	 
	 }
	 
	 public function bucket_upload_object( $source, $target_name, $use_validation = false, $permissions = "private" ) {
	 
	 	$opts = array(
	 		'name'			=> $target_name,
	 		'validate'		=> $use_validation,
	 		'predefinedAcl'	=> $permissions
	 	);
	 	$this->object = $this->bucket->upload( $source, $opts );
	 	get_object_acl();
	 	return $this->object;
	 
	 }
	 
	 //Options - delimiter(string)[null], maxResults(int)[1000], prefix(string)[null], projection(string)[null], versions(bool)[false], fields(string)[null]
	 public function bucket_get_objects( $options = array() ) {
	 	
	 	if( ! is_array( $options ) ) {
		
			$this->errors[$this->error_count] = 'options not given as array';
			$this->error_count++;
		
		}
		
		return $this->bucket->objects( $options );
		
	 }
	
	/**
	 * Bucket ACL operations
	 *
	 * Operations to query and modify access to the bucket itself.
	 * Operations are: Query entity's role, update entity's role, add entity and role, remove entity and role
	 *
	 **/
	
	public function bucket_acl_entity_add( $entity, $role ) {
	
		return $this->bucket_acl->add( $entity, $role);
	
	}
	
	public function bucket_acl_entity_remove( $entity ) {
	
		$this->bucket_acl->delete( $entity);
	
	}
	
	public function bucket_acl_entity_get( $entity ) {
	
		$opts = array(
			'entity'	=> $entity
		);
		return $this->bucket_acl->get( $opts );
	
	}
	
	public function bucket_acl_entity_update( $entity, $role ) {
	
		return $this->bucket_acl->update( $entity, $role );
	
	}
	
	/**
	 * Bucket Default Object ACL operations
	 *
	 * Operations to query and modify default access to objects added to this bucket.
	 * Operations are: Query entity's role, update entity's role, add entity and role, remove entity and role
	 *
	 **/
	
	public function bucket_default_acl_entity_add( $entity, $role ) {
	
		return $this->bucket_default_acl->add( $entity, $role);
	
	}
	
	public function bucket_default_acl_entity_remove( $entity ) {
	
		$this->bucket_default_acl->delete( $entity);
	
	}
	
	public function bucket_default_acl_entity_get( $entity ) {
	
		$opts = array(
			'entity'	=> $entity
		);
		return $this->bucket_default_acl->get( $opts );
	
	}
	
	public function bucket_default_acl_entity_update( $entity, $role ) {
	
		return $this->bucket_default_acl->update( $entity, $role );
	
	}
	
	/**
	 * Object operations
	 *
	 * Operations are:  rename, delete, download, exists, get info
	 *
	 **/
	
	public function object_exists( $name ) {
		
		$this->object = $this->bucket->object( $name );
		return $this->object->exists();
		
	}
	
	public function object_get_info() {
		
		return $this->object->info();
		
	}
	
	public function object_download( $destination ) {
	
		return $this->$object->downloadToFile( $destination );
	
	}
	
	public function object_delete() {
	
		$this->object_acl = null;
		$this->object->delete();
	
	}
	
	public function object_rename( $new_name ) {
	
		$this->object = $this->object->rename( $new_name );
		return $this->object;
	
	}
	 
	 
	/**
	 * Protected functions
	 *
	 **/
	
	protected function get_object_acl() {
	
		$this->object_acl = $this->object->acl();
	
	}
	
	protected function get_bucket_acl() {
	
		$this->bucket_acl = $this->bucket->defaultAcl();
	
	}
	
	protected function get_bucket_default_acl() {
	
		$this->bucket_default_acl = $this->bucket->acl();
	
	}
	
	protected function connect_to_gcs() {
		
		$this->connection = new ServiceBuilder([
			'projectId'	=> $this->project,
			'keyFile'	=> $this->json_key
		]);
		$this->storage = $this->connection->storage();
	
	}
	
	protected function get_bucket() {
	
		$this->bucket = $this->storage->bucket($this->bucket_id);
		if( !( $this->bucket->exists() ) ) {
		
			$this->errors[$this->error_count] = 'bucket ' . $this->bucket_id . ' does not exist';
			$this->error_count++;
		
		}
	
	}

}


