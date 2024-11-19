defmodule AppWebGameControllerTest do
  # use App.DataCase

  use AppWeb.ConnCase


  alias AppWeb.Game.Game, as: GameFixture
  alias App.Game
  alias App.Repo


  test "GET /", %{conn: conn} do
    joy = Map.from_struct(%GameFixture{})
    IO.puts(inspect(joy))
    gameTry = %Game{}

    Game.changeset(%Game{}, %{groups: joy.groups, extra: "just got here bro"})
      |> Repo.insert()


    # Game.changeset(game, %{extra: "false"})
    # Repo.insert(game)

    conn = get(conn, ~p"/api/game")
    assert json_response(conn, 200)["groups"] == [

    ]
  end
end
