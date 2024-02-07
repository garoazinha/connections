defmodule AppWebGameControllerTest do
  use AppWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, ~p"/api/game")
    assert json_response(conn, 200)["groups"] == [

    ]
  end
end
