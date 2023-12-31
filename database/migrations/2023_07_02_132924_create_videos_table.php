<?php

use App\Http\Helpers\Variable;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('owner_id')->nullable();
            $table->foreign('owner_id')->references('id')->on('users')->onDelete('no action');
            $table->unsignedBigInteger('article_id')->nullable();
            $table->foreign('article_id')->references('id')->on('articles')->onDelete('no action');

            $table->unsignedInteger('category_id')->nullable();
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('no action');
            $table->string('name', 200);
            $table->string('description', 2048)->nullable();
            $table->string('slug', 200)->nullable();
            $table->unsignedInteger('view')->default(0);
            $table->unsignedInteger('viewer')->default(0);
            $table->unsignedInteger('charge',)->default(0);
            $table->unsignedInteger('view_fee')->default(Variable::MIN_VIEW_FEE('video'))->nullable();
            $table->unsignedInteger('meta')->default(0);
            $table->unsignedInteger('duration')->default(0);
            $table->string('tags', 200)->nullable();

            $table->enum('status', array_column(Variable::STATUSES, 'name'))->nullable();
            $table->string('lang', 2)->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('videos');
    }
};
