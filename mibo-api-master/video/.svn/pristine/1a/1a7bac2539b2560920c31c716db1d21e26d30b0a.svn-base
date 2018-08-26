<?php

class Model_Game extends PhalApi_Model_NotORM
{

    protected function getTableName($id)
    {
        return 'game';
    }

    //写入直播间开启游戏表
    public function insertGameStatus($data)
    {
        if (!isset($data['live_id'])) throw new PhalApi_Exception('缺少live_id');
        DI()->notorm->live_game->insert($data);
        $insert_id = DI()->notorm->live_game->insert_id();
        DI()->redis->del('game_of_live_id_' . $data['live_id']);
        return $insert_id;
    }

    public function getLiveGame($live_id)
    {
        $live_game = DI()->redis->get_time('game_of_live_id_' . $live_id);
        if (!empty($live_game)) return $live_game;

        $live_game = DI()->notorm->live_game->where('live_id = ?', $live_id)
            ->order('id DESC')->fetchOne();
        //如果游戏是开启的
        $live_game = (!empty($live_game) && $live_game['status'] == 1) ? $live_game : '';
        DI()->redis->set_time('game_of_live_id_' . $live_id, $live_game);
        return $live_game;
    }

    public function insertGameCardLoopLog($data)
    {
        DI()->notorm->game_loop_card_log->insert($data);
        $insert_id = DI()->notorm->game_loop_card_log->insert_id();
        DI()->redis->del('card_info_of_live_' . $data['live_id']);
        return $insert_id;
    }

    public function getLastLoopCards($live_id)
    {
        $key = 'card_info_of_live_' . $live_id;

        $redis_card = DI()->redis->get_time($key);
        if (isset($redis_card) && !empty($redis_card)) {
            return json_decode($redis_card, true);
        }

        $card_info = DI()->notorm->game_loop_card_log
            ->select("id as loop_id, gid, dealer_id, dealer_card, pool1_card, pool2_card, pool3_card, start_server_time")
            ->where('live_id=?', $live_id)
            ->order('id DESC')
            ->fetchOne();

        if (empty($card_info)) return array();

        if($card_info['gid'] == GAME_PSZ) {
            $domain_game = new Domain_PSZGame();
        } elseif ($card_info['gid'] == GAME_DN) {
            $domain_game = new Domain_DNGame();
        }

        if(isset($domain_game)) {
            $pool_rate = $domain_game->getPoolRate(0,$card_info);

            $card_info['pool1_rate'] = $pool_rate[0];
            $card_info['pool2_rate'] = $pool_rate[1];
            $card_info['pool3_rate'] = isset($pool_rate[2]) ? $pool_rate[2] : 0;
            $card_info['dealer_rate'] = 0;
            $card_info['pool1_style'] = $domain_game->getCardStyle(json_decode($card_info['pool1_card'], true));
            $card_info['pool2_style'] = $domain_game->getCardStyle(json_decode($card_info['pool2_card'], true));
            $card_info['pool3_style'] = $domain_game->getCardStyle(json_decode($card_info['pool3_card'], true));
            $card_info['dealer_style'] = $domain_game->getCardStyle(json_decode($card_info['dealer_card'], true));
        }

        DI()->redis->set_time($key, json_encode($card_info), 25);
        return $card_info;
    }

    public function insertGameLoopSettlement($data)
    {
        DI()->notorm->game_loop_settlement->insert($data);
        $insert_id = DI()->notorm->game_loop_settlement->insert_id();
        return $insert_id;
    }

    public function getGameLoopInfoByLoopId($loop_id)
    {
        $key = "getGameLoopInfoByLoopId_" . $loop_id;
        $loop_info = json_decode(DI()->redis->get_time($key), true);
        if (!empty($loop_info)) {
            return $loop_info;
        }

        $rs = DI()->notorm->game_loop_card_log->select('*')->where('id = ?', $loop_id)->fetchOne();

        if (!empty($rs)) {
            DI()->redis->set($key, $rs, 600);
        }

        return $rs;
    }

    //开心榜
    public function getUserWinInLiveList($live_id)
    {
        //从game_loop_settlement表中取出某个直播间赢得最多的用户，并从用户表中取得nick_name
        $sql = "select user.nick_name, sum(game.earn_num) as earn_num " .
            "from mb_game_loop_settlement as game left join mb_user as user " .
            "on game.user_id = user.id where game.live_id = {$live_id} " .
            "group by game.user_id having sum(game.earn_num) > 0 " .
            "order by sum(game.earn_num) DESC limit 30 offset 0 ";
        $rs = $this->getORM()->queryAll($sql);
        return $rs;
    }

    public function getWinnerByLiveidLoopid($live_id, $loop_id)
    {
        //从game_loop_settlement表中取出某个直播间某场游戏赢得最多的用户，并从用户表中取得nick_name
        $sql = "select game.user_id, user.nick_name, game.earn_num " .
            "from mb_game_loop_settlement as game left join mb_user as user " .
            "on game.user_id = user.id where game.live_id = {$live_id} " .
            "and game.loop_id = {$loop_id} and game.earn_num > 0 " .
            "order by game.earn_num DESC limit 1 offset 0 ";
        $rs = $this->getORM()->queryAll($sql);
        return $rs;
    }

    //伤心榜
    public function getUserLoseInLiveList($live_id)
    {
        //从game_loop_settlement表中取出某个直播间输得最多的用户，并从用户表中取得nick_name
        $sql = "select user.nick_name, sum(game.earn_num) as earn_num " .
            "from mb_game_loop_settlement as game left join mb_user as user " .
            "on game.user_id = user.id where game.live_id = {$live_id} " .
            "group by game.user_id having sum(game.earn_num) < 0 " .
            "order by sum(game.earn_num) ASC limit 30 offset 0 ";
        $rs = $this->getORM()->queryAll($sql);
        return $rs;
    }

    public function changeDealer($data)
    {
        DI()->notorm->apply_dealer->insert($data);
        $id = DI()->notorm->apply_dealer->insert_id();
        DI()->redis->del('dealer_live_id_' . $data['live_id']);
        return $id;

    }


}
