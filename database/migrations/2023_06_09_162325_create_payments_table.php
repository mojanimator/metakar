<?php

use App\Helpers\Helper;
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
//    'pay_type', 'pay_for', 'pay_result',
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('owner_id')->unsigned()->nullable();
//            $table->bigInteger('inviter_user_id')->unsigned()->nullable();
//            $table->string('shaparak_id', 50)->nullable();
            $table->string('title', 100)->nullable();
            $table->string('transaction_id', 50)->nullable();
            $table->string('order_id', 50)->nullable();
            $table->string('type', 50)->nullable();
            $table->enum('market', Variable::MARKETS)->nullable();
            $table->enum('gateway', Variable::GATEWAYS)->nullable();

            $table->string('coupon', 10)->nullable();
            $table->string('info', 2048)->nullable();
            $table->integer('amount')->default(0);
            $table->boolean('is_success')->default(false);
            $table->foreign('owner_id')->references('id')->on('users')->onDelete('no action');

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
        Schema::dropIfExists('payments');
    }
};
